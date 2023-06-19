const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user.controller");
//const studentController = require("../controllers/student.controller");

router.get("/findAll", userController.findAll);
router.get("/getByUsername/:username", userController.getByUsername);
router.get("/getById/:id", userController.getById);

router.post("/create", userController.create);

router.patch("/update/:username", userController.update);

router.delete("/deleteById/:id", userController.deleteById);
router.delete("/deleteByUsername/:username", userController.deleteByUsername);

// router.post("/createUser/:category", userController.createUser); //ok

// router.get("/findAll/:category", userController.findAll); //ok

// // using route parameter
router.get(
  "/getUserId/:category/:lastname/:firstname",
  userController.getUserId
); //ok

// // // using query parameter
//router.get("/getUserId", userController.getUserId);

// router.get("/getUserById/:id", userController.getUserById); //ok

// router.get("/getUserByUsername/:username", userController.getUserByUsername); //ok

// router.patch("/updateUserById/:id/:category", userController.updateUserById); //ok

// router.patch(
//   "/updateUserByUsername/:username/:category",
//   userController.updateUserByUsername
// ); //ok

// // router.patch(
// //   "/updateUserByUsername?category=:category&username=:username",
// //   userController.updateUserByUsername
// // );

// router.delete("/deleteUser/id/:id", userController.deleteUserById); //ok

// router.delete(
//   "/delete/username/:username",
//   userController.deleteUserByUsername
// ); //ok

// //the below routes refers to student
// router.get("/unpaid", studentController.findNoPaidInstallment);
// router.get("/grades", studentController.getAllGrades);
// router.get("/grades/semester", studentController.getGradesBySemester);
// router.get("/group/:group", studentController.findStudentsByGroup);

module.exports = router;

/*
The reason why "username" appears twice in the path is that the first occurrence of "username" 
is a static part of the URL path, while the second occurrence of "username" (URL parameter) 
is a placeholder for a dynamic value that will be extracted from the URL at runtime.

For example,  a DELETE request to "/delete/username/johndoe", the "johndoe" part will be 
extracted from the URL and passed as an argument to the "deleteUserByUsername" 
function, which can then use it to delete the user with the corresponding username.
*/
