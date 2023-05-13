const express = require("express");
const router = express.Router();

const scheduleController = require("../controllers/schedule.controller");

router.post("/createSchedule", scheduleController.createSchedule);
