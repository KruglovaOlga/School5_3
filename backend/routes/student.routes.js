//Should I delete this file!?

const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student.controller");
router.get("/findAll", studentController.findAll);
router.get("/getStudentById/:id", studentController.getStudentById);
router.get(
  "/getStudentByUsername/:username",
  studentController.getStudentByUsername
);
router.post("/createStudent", studentController.createStudent);

router.patch(
  "/updateStudentByUsername",
  studentController.updateStudentByUsername
);
router.patch("/updateStudentById", studentController.updateStudentById);

//router.deleteStudent("/delete/:username", studentController.deleteStudent);

// router.get(
//   "/findStudentsByGroup/:group",
//   studentController.findStudentsByGroup
// );

router.get("/unpaid", studentController.findNoPaidInstallment);
router.get("/grades", studentController.getAllGrades);
router.get("/grades/semester", studentController.getGradesBySemester);
router.get("/group/:group", studentController.findStudentsByGroup);

module.exports = router;
