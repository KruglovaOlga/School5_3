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
  "/updateSchedule/:day_of_week/:teacher/:group",
  scheduleController.updateSchedule
);

router.patch(
  "/updateScheduleByDayAndGroup/:day_of_week/:group",
  scheduleController.updateScheduleByDayAndGroup
);

router.delete("/deleteSchedule", scheduleController.deleteSchedule);

router.get("/groups", scheduleController.findAllGroupsInDay);
router.get("/students", scheduleController.findAllStudentsInGroup);
router.get("/lesson", scheduleController.findLesson);
router.get("/:scheduleId/teacher-group", scheduleController.findTeacherGroup);
router.get("/teacher/:teacher", scheduleController.findSchedulesByTeacher);
router.get("/group/:group", scheduleController.findSchedulesByGroup);

module.exports = router;
