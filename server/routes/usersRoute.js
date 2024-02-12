const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

router.get("/", userController.getAllUsers);
// router.get("/:id", userController.getAllUserssById);
// router.delete("/:id", userController.deleteUsersById);
// router.post("/", userController.addNewUsers);
// router.put("/:id", userController.updateUsers);
router.post("/singUp", userController.singUp);
router.post("/login", userController.login);

module.exports = router;
