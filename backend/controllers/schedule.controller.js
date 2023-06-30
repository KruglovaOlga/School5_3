const Schedule = require("../models/schedule.model");
const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");
const { parse } = require("node:path/win32");

// get all schedules from the database
//(GET)http://localhost:3000/api/schedule/getAllSchedules
exports.findAll = async (req, res) => {
  try {
    // find all schedules using the schema
    const result = await Schedule.find();

    // send a success response with the schedules array
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    // handle any errors
    res.status(400).json({ status: false, data: error });
  }
};

// Find a schedule by day_of_week, teacher, and group
//http://localhost:3000/api/schedule/findScheduleId/1/teacher1/B1
// "error": "Schedule not found"
exports.findOne = async (req, res) => {
  const day_of_week = parseInt(req.params.dayOfWeek);
  const teacher = req.params.teacher;
  const group = req.params.group;

  try {
    let result = await Schedule.findOne({
      day_of_week: day_of_week,
      teacher: teacher,
      group: group,
    });

    if (!result) {
      return res
        .status(404)
        .json({ status: false, data: "Schedule not found" });
    }

    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, data: error.message });
  }
};

// create a new schedule document
//(POST)http://localhost:3000/api/schedule/createSchedule
// {
//   "day_of_week":6,
//   "start_time": "12:00",
//   "finish_time": "13:00",
//   "lesson": "Delete",
//   "group": "A3",
//   "classroom": "class3",
//   "teacher": "teacher8",
//   "students": ["student010","student035"]
// }
exports.create = async (req, res) => {
  try {
    // get the data from the request body
    const {
      day_of_week,
      start_time,
      finish_time,
      lesson,
      group,
      classroom,
      teacher,
      students,
    } = req.body;

    // create a new schedule object using the schema
    const newSchedule = new Schedule({
      day_of_week,
      start_time,
      finish_time,
      lesson,
      group,
      classroom,
      teacher,
      students,
    });

    // save the new schedule object to the database
    const result = await newSchedule.save();

    // send a success response with the new schedule object
    res.status(201).json({ status: true, data: result });
  } catch (error) {
    // handle any errors
    res.status(500).json({ status: false, data: error.message });
  }
};

// update a schedule by id

//(PATCH)http://localhost:3000/api/schedule/updateSchedule?_id=6471a80fb8c1bdcb0a800b18

//ACTUALLY DOESN'T UPDATE, BUT "message": "Schedule updated successfully", "data": null
// {
//   "day_of_week": 1,
//   "start_time": "09:00 AM",
//   "finish_time": "10:30 AM",
//   "lesson": "Use of English",
//   "group": "A2",
//   "classroom": "4",
//   "teacher": "Diana",
//   "students": ["Alice", "Thomas", "Charlie"]
// }

//(PATCH)http://localhost:3000/api/schedule/updateSchedule/1/teacher1/B1
//"error": "Schedule not found"
exports.update = async (req, res) => {
  console.log("Update schedule");

  const {
    day_of_week,
    start_time,
    finish_time,
    lesson,
    group,
    classroom,
    teacher,
    students,
  } = req.body;

  try {
    const result = await Schedule.findOneAndUpdate(
      { day_of_week: day_of_week, teacher: teacher, group: group },
      {
        start_time: start_time,
        finish_time: finish_time,
        lesson: lesson,
        classroom: classroom,
        students: students,
      },
      { new: true } // return the updated document
    );
    if (!result) {
      return res
        .status(404)
        .json({ status: false, data: "Schedule not found" });
    }
    res.status(201).json({ status: true, data: result });
  } catch (error) {
    // handle any errors
    res.status(500).json({ status: false, data: error.message });
  }
};

exports.updateByDayAndGroup = async (req, res) => {
  console.log("Update schedule By Day And Group");

  const {
    day_of_week,
    start_time,
    finish_time,
    lesson,
    group,
    classroom,
    teacher,
    students,
  } = req.body;

  try {
    const result = await Schedule.findOneAndUpdate(
      { day_of_week: day_of_week, group: group },
      {
        start_time: start_time,
        finish_time: finish_time,
        teacher: teacher,
        lesson: lesson,
        classroom: classroom,
        students: students,
      },
      { new: true } // return the updated document
    );
    if (!result) {
      return res.status(404).json({ status: true, data: "Schedule not found" });
    }
    res.status(201).json({ status: true, data: result });
  } catch (error) {
    // handle any errors
    res.status(500).json({ status: false, data: error.message });
  }
};

// delete a schedule by id
//PLEASE, CHOOSE TO DELETE ONLY THOSE DOCS, WHERE "lesson": "Delete"

//(DELETE)http://localhost:3000/api/schedule/deleteSchedule?_id=6471a80fb8c1bdcb0a800b18
exports.delete = async (req, res) => {
  console.log("Delete schedule");

  // get the id from the request params
  const { id } = req.params;

  try {
    // find and delete the schedule by id using the schema
    const result = await Schedule.findByIdAndDelete(id);

    // send a success response with a message
    res.status(201).json({ status: true, data: result });
  } catch (error) {
    // handle any errors
    res.status(500).json({ status: false, data: error.message });
  }
};

exports.findAllGroupsInDay = async (req, res) => {
  console.log("Find All Groups In Day");

  const day_of_week = parseInt(req.params.dayOfWeek);

  try {
    let result = await Schedule.find({
      day_of_week: day_of_week,
    });

    if (!result) {
      return res
        .status(404)
        .json({ status: false, data: "Schedule not found" });
    }

    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, data: error.message });
  }
};

exports.findAllStudentsInGroup = async (req, res) => {
  console.log("Find All Students In Group");

  const group = req.params.group;

  try {
    let result = await Schedule.find({ group: group }, { students: 1 });

    if (!result) {
      return res
        .status(404)
        .json({ status: false, data: "Schedule not found" });
    }

    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, data: error.message });
  }
};

exports.findLesson = async (req, res) => {
  console.log("Find Lesson");

  const lesson = req.params.lesson;

  try {
    let result = await Schedule.find({ lesson: lesson });

    if (!result) {
      return res
        .status(404)
        .json({ status: false, data: "Schedule not found" });
    }

    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, data: error.message });
  }
};

exports.findTeacherGroup = async (req, res) => {
  console.log("Find Teacher and Group");

  const teacher = req.params.teacher;
  const group = req.params.group;

  try {
    let result = await Schedule.find({ teacher: teacher, group: group });

    if (!result) {
      return res
        .status(404)
        .json({ status: false, data: "Schedule not found" });
    }

    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, data: error.message });
  }
};

exports.findSchedulesByTeacher = async (req, res) => {
  console.log("Find Schedules By Teacher");

  const teacher = req.params.teacher;

  try {
    let result = await Schedule.find({ teacher: teacher });

    if (!result) {
      return res
        .status(404)
        .json({ status: false, data: "Schedule not found" });
    }

    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, data: error.message });
  }
};

exports.findSchedulesByGroup = async (req, res) => {
  console.log("Find Schedules By Group");

  const group = req.params.group;

  try {
    let result = await Schedule.find({ group: group });

    if (!result) {
      return res
        .status(404)
        .json({ status: false, data: "Schedule not found" });
    }

    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, data: error.message });
  }
};
