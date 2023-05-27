const express = require("express");
const router = express.Router();

const scheduleController = require("../controllers/schedule.controller");

router.post("/createSchedule", scheduleController.createSchedule);
router.get("/getAllSchedules", scheduleController.getAllSchedules);
router.patch("/updateSchedule", scheduleController.updateSchedule);
router.delete("/deleteSchedule", scheduleController.deleteSchedule);

module.exports = router;
