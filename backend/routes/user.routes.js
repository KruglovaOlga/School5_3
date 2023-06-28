const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/findAll", userController.findAll);
router.get("/getByUsername/:username", userController.getByUsername);
router.get("/getById/:id", userController.getById);

router.post("/create", userController.create);

router.patch("/update/:username", userController.update);

router.delete("/deleteById/:id", userController.deleteById);
router.delete("/deleteByUsername/:username", userController.deleteByUsername);

module.exports = router;
