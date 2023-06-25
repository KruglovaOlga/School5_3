const express = require("express");
const router = express.Router();

const teacherController = require("../controllers/teacher.controller");

router.get("/findAll", teacherController.findAll);
router.get("/getById/:id", teacherController.getById);
router.get("/getByUsername/:username", teacherController.getByUsername);

router.post("/create", teacherController.create);

router.patch("/update/", teacherController.update);

router.delete("/deleteById/:id", teacherController.deleteById);
router.delete("/deleteByUsername/:username", teacherController.deleteByUsername);

module.exports = router;
