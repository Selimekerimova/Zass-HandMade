const Users = require("../models/usersModel");

const singUp = async (req, res) => {
  const { userName, email, password, password2 } = req.body;
  if (!userName || !email || !password || !password2) {
    res.status(400).send({ message: "fill all inputs" });
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
  } catch (error) {}
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).send({message:"fill all info"})
  }
  try {
    const user = await Users.findOne({email:email})
    if(!user){
    return  res.status(400).send({message:"password or email false"})
    }
    res.status(200).send({message:"successfuly login"})
  } catch (error) {
    res.send({message: error.message}).status(500)
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

//get product by id

// const getAllUserssById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await Users.findById(id);
//     res.send(user).status(200);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// const deleteUsersById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedUser = await Users.findByIdAndDelete(id);
//     const users = await Users.find({});
//     res.status(200).json({
//       message: "success",
//       deletedUser: deletedUser,
//       allUsers: users,
//     });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

//post new product

// const addNewUsers = async (req, res) => {
//   const newUser = new Users({ ...req.body });
//   try {
//     await newUser.save();
//     res.status(201).send({
//       message: "created succesfully!",
//       data: newUser,
//     });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// update data, put

// const updateUsers = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Users.findByIdAndUpdate(id, { ...req.body });
//     const updateUsers = await Users.findById(id);
//     res.status(200).send({
//       message: "updated succesfully!",
//       data: updateUsers,
//     });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

module.exports = {
  getAllUsers,
  // getAllUserssById,
  // deleteUsersById,
  // addNewUsers,
  // updateUsers,
  singUp,
  login
};
