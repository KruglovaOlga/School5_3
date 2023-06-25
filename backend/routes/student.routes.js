const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student.controller");

router.get("/findAll", studentController.findAll);
router.get("/getById/:id", studentController.getById);
router.get("/getByUsername/:username", studentController.getByUsername);

router.post("/create", studentController.create);

router.patch("/update/", studentController.update);

router.delete("/deleteById/:id", studentController.deleteById);
router.delete("/deleteByUsername/:username", studentController.deleteByUsername);

module.exports = router;