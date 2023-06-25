const express = require("express");
const router = express.Router();

const scheduleController = require("../controllers/schedule.controller");


router.get("/findAll", scheduleController.findAll); 
router.get("/findOne/:dayOfWeek/:teacher/:group", scheduleController.findOne);

router.post("/create", scheduleController.create);


router.patch("/update", scheduleController.update);
router.patch("/updateByDayAndGroup", scheduleController.updateByDayAndGroup);

router.delete("/delete/:id", scheduleController.delete);

router.get("/group/:dayOfWeek", scheduleController.findAllGroupsInDay);
router.get("/students/:group", scheduleController.findAllStudentsInGroup);
router.get("/lesson/:lesson", scheduleController.findLesson);
router.get("/teacher-group/:teacher/:group", scheduleController.findTeacherGroup);
router.get("/teacher/:teacher", scheduleController.findSchedulesByTeacher);
router.get("/bygroup/:group", scheduleController.findSchedulesByGroup);


module.exports = router;
