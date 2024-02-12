const mongoose = require("mongoose");
const { Schema } = mongoose;

const userScheam = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    password2: { type: String },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userScheam);

module.exports = Users;
