const express = require("express");
const router = express.Router();

const teacherController = require("../controllers/teacher.controller");
router.get("/findAll", teacherController.findAll);
router.get("/findOne/:username", teacherController.findOne);
router.post("/create", teacherController.create);
router.patch("/update", teacherController.update);
router.delete("/delete/:username", teacherController.delete);

module.exports = router;
