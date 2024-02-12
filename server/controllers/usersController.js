const Users = require("../models/usersModel");

const singUp = async (req, res) => {
  const { username, email, password, password2 } = req.body;
  if (!username || !email || !password || !password2) {
    return res.status(400).send({ message: "fill all inputs" });
  }
  try {
    const user = await Users.findOne({ email: email });
    if (user) {
      res.status(400).send({ message: "this email alredy used" });
    } else {
      const newUser = new Users(req.body);

      try {
        await newUser.save();
        res.send({
          message: "created succesfully!",
          data: newUser,
        });
      } catch (error) {
        res.send({ message: error.message }).status(500);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "fill all info" });
  }
  try {
    const user = await Users.findOne({ email: email, password: password });
    if (!user) {
      return res.status(400).send({ message: "password or email false" });
    }
    res.status(200).send({ message: "successfuly login" });
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.send(users).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};



module.exports = {
  getAllUsers,
  singUp,
  login,
};
