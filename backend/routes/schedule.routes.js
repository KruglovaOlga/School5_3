const express = require("express");
const router = express.Router();

const scheduleController = require("../controllers/schedule.controller");

router.post("/createSchedule", scheduleController.createSchedule); //ok
router.get("/getAllSchedules", scheduleController.getAllSchedules); //ok
router.get(
  "/findScheduleId/:dayOfWeek/:teacher/:group",
  scheduleController.findScheduleId
);
router.patch(
  "/updateSchedule/:dayOfWeek/:teacher/:group",
  scheduleController.updateSchedule
);
router.patch("/updateSchedule", scheduleController.updateSchedule);
router.delete("/deleteSchedule", scheduleController.deleteSchedule);

module.exports = router;
