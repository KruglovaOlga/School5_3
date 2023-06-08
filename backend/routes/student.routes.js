const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student.controller");

router.get("/findAll", studentController.findAll);
router.get("/getById/:id", studentController.getById);
router.get("/getByUsername/:username", studentController.getByUsername);

router.post("/create", studentController.create);

router.patch("/update/:username", studentController.update);

router.delete("/deleteById/:id", studentController.deleteById);
router.delete(
  "/deleteByUsername/:username",
  studentController.deleteByUsername
);

// router.get("/findAll", studentController.findAll);
// router.get("/getStudentById/:id", studentController.getStudentById);
// router.get(
//   "/getStudentByUsername/:username",
//   studentController.getStudentByUsername
// );
// router.post("/createStudent", studentController.createStudent);

// router.patch(
//   "/updateStudentByUsername",
//   studentController.updateStudentByUsername
// );
// router.patch("/updateStudentById", studentController.updateStudentById);

// //router.deleteStudent("/delete/:username", studentController.deleteStudent);

router.get(
  "/findStudentsByGroup/:group",
  studentController.findStudentsByGroup
);

router.get("/student/unpaid", studentController.findNoPaidInstallment);
router.get("/student/grades", studentController.getAllGrades);
router.get("/student/grades/semester", studentController.getGradesBySemester);
router.get("/student/group/:group", studentController.findStudentsByGroup);

module.exports = router;
