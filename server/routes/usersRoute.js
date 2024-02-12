const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

router.get("/users", userController.getAllUsers);
router.post("/signup", userController.singUp);
router.post("/login", userController.login);

module.exports = router;
