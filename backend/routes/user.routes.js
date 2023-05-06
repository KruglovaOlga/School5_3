const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
router.post("/createUser", userController.createUser); //ok
router.get("/findAll/:category", userController.findAll);
router.get("/getUserById", userController.getUserById);
router.get("/getUserByUsername/:username", userController.getUserByUsername); //ok
router.patch("/updateUserById/:id/:role", userController.updateUserById);
router.patch(
  "/updateUserByUsername/:username/:role",
  userController.updateUserByUsername
);
//router.delete("/delete/:id", userController.deleteUserById);
//router.delete("/delete/:username", userController.deleteUserByUsername);

router.delete("/delete/id/:id", userController.deleteUserById);

router.delete(
  "/delete/username/:username",
  userController.deleteUserByUsername
); //ok

module.exports = router;

/*
The reason why "username" appears twice in the path is that the first occurrence of "username" 
is a static part of the URL path, while the second occurrence of "username" (URL parameter) 
is a placeholder for a dynamic value that will be extracted from the URL at runtime.

For example,  a DELETE request to "/delete/username/johndoe", the "johndoe" part will be 
extracted from the URL and passed as an argument to the "deleteUserByUsername" 
function, which can then use it to delete the user with the corresponding username.
*/
