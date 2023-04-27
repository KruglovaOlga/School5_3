const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student.controller");
router.get("/findAll", studentController.findAll);
router.get("/findOne/:username", studentController.findOne);
router.post("/create", studentController.create);
router.patch("/update", studentController.update);
router.delete("/delete/:username", studentController.delete);

module.exports = router;
