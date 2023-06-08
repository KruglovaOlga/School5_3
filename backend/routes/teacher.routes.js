const express = require("express");
const router = express.Router();

const teacherController = require("../controllers/teacher.controller");

router.get("/findAll", teacherController.findAll);
router.get("/getById/:id", teacherController.getById);
router.get("/getByUsername/:username", teacherController.getByUsername);

router.post("/create", teacherController.create);

router.patch("/update/:username", teacherController.update);

router.delete("/deleteById/:id", teacherController.deleteById);
router.delete(
  "/deleteByUsername/:username",
  teacherController.deleteByUsername
);

// router.get("/findAll", teacherController.findAll);
// router.get("/getTeacherById/:id", teacherController.getTeacherById);
// router.get(
//   "/getTeacherByUsername/:username",
//   teacherController.getTeacherByUsername
// );
// router.post("/createTeacher", teacherController.createTeacher);

// router.patch(
//   "/updateTeacherByUsername",
//   teacherController.updateTeacherByUsername
// );
// router.patch("/updateTeacherById/:id", teacherController.updateTeacherById);
// //router.deleteTeacher("/delete/:username", teacherController.deleteTeacher);

module.exports = router;
