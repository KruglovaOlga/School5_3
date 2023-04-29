const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
router.post("/createUser", userController.createUser);
router.get("/getUsers", userController.getUsers);
router.get("/getUserById", userController.getUserById);
router.get("/getUserByUsername/:username", userController.getUserByUsername);
router.patch("/updateUserById/:id/:role", userController.updateUserById);
router.patch(
  "/updateUserByUsername/:username/:role",
  userController.updateUserByUsername
);
router.delete("/delete/:id", userController.deleteUserById);
router.delete("/delete/:username", userController.deleteUserByUsername);

module.exports = router;
