const express = require("express");
const router = express.Router();

const teacherController = require("../controllers/teacher.controller");
router.get("/findAll", teacherController.findAll);
router.get("/getTeacherById/:id", teacherController.getTeacherById);
router.get(
  "/getTeacherByUsername/:username",
  teacherController.getTeacherByUsername
);
router.post("/createTeacher", teacherController.createTeacher);

router.patch(
  "/updateTeacherByUsername",
  teacherController.updateTeacherByUsername
);
router.patch("/updateTeacherById", teacherController.updateTeacherById);
router.deleteTeacher("/delete/:username", teacherController.deleteTeacher);

module.exports = router;
