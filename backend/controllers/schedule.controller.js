const Schedule = require("../models/schedule.model");
const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");

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
exports.createSchedule = async (req, res) => {
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
    await newSchedule.save();

    // send a success response with the new schedule object
    res.status(201).json({
      message: "Schedule created successfully",
      data: newSchedule,
    });
  } catch (error) {
    // handle any errors
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

// get all schedules from the database
//(GET)http://localhost:3000/api/schedule/getAllSchedules
exports.getAllSchedules = async (req, res) => {
  try {
    // find all schedules using the schema
    const schedules = await Schedule.find();

    // send a success response with the schedules array
    res.status(200).json({
      message: "Schedules retrieved successfully",
      data: schedules,
    });
  } catch (error) {
    // handle any errors
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

// Find a schedule by day_of_week, teacher, and group
//http://localhost:3000/api/schedule/findScheduleId/1/teacher1/B1
// "error": "Schedule not found"
exports.findScheduleId = async (req, res) => {
  try {
    const day_of_week = req.params.day_of_week;
    const teacher = req.params.teacher;
    const group = req.params.group;

    let schedule = await Schedule.findOne({
      day_of_week: day_of_week,
      teacher: teacher,
      group: group,
      // $or: [
      //   { day_of_week: day_of_week },
      //   { teacher: teacher },
      //   { group: group },
      // ],
    });

    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    res.json(schedule._id);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve schedule" });
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
exports.updateSchedule = async (req, res) => {
  try {
    // get the id from the request params
    const day_of_week = req.params.day_of_week;
    const teacher = req.params.teacher;
    const group = req.params.group;
    const scheduleData = req.body;

    let updatedSchedule = await Schedule.findOneAndUpdate(
      { day_of_week: day_of_week, teacher: teacher, group: group },
      { ...scheduleData },
      { new: true } // return the updated document
    );
    if (!updatedSchedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.status(200).json({
      message: "Schedule updated successfully",
      data: updatedSchedule,
    });
  } catch (error) {
    // handle any errors
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

//error
exports.updateScheduleByDayAndGroup = async (
  day_of_week,
  group,
  scheduleData,
  res
) => {
  try {
    let updatedSchedule = await Schedule.findOneAndUpdate(
      { day_of_week: day_of_week, group: group },
      { ...scheduleData },
      { new: true } // return the updated document
    );
  } catch (err) {
    res.status(500).json({ status: false, data: err });
    console.log(
      `Error in updating schedule with day ${day_of_week} and group ${group}`,
      err
    );
  }
};

// //http://localhost:3000/api/schedule/updateScheduleByDayAndGroup?day_of_week=1&group=B1
// //"error": "Schedule not found"
// // update a schedule by day of week and group
// exports.updateScheduleByDayAndGroup = async (req, res) => {
//   try {
//     // get the day of week and group from the request query
//     const { day_of_week, group } = req.query;

//     // convert the day of week to a number
//     const day = Number(day_of_week);

//     // get the data from the request body
//     const { start_time, finish_time, lesson, classroom, teacher, students } =
//       req.body;

//     // find and update the schedule by day of week and group using the schema
//     const updatedSchedule = await Schedule.findOneAndUpdate(
//       { day_of_week, group },
//       {
//         start_time,
//         finish_time,
//         lesson,
//         classroom,
//         teacher,
//         students,
//       },
//       { new: true }
//     ); // return the updated document

//     // send a success response with the updated schedule object
//     res.status(200).json({
//       message: "Schedule updated successfully",
//       data: updatedSchedule,
//     });
//   } catch (error) {
//     // handle any errors
//     res.status(500).json({
//       message: "Something went wrong",
//       error,
//     });
//   }
// };

// // get the day of week and group from the request query
// const { day_of_week, group } = req.query;

// // convert the day of week to a number
// const day = Number(day_of_week);

// // find and update the schedule by day of week and group using the schema
// const updatedSchedule = await Schedule.updateOne(
//   { day_of_week: day, group },
//   {
//     start_time,
//     finish_time,
//     lesson,
//     classroom,
//     teacher,
//     students,
//   },
//   { new: true }
// );

// delete a schedule by id
//PLEASE, CHOOSE TO DELETE ONLY THOSE DOCS, WHERE "lesson": "Delete"

//ACTUALLY DOESN'T DELETE, BUT  message: "Schedule deleted successfully"

//(DELETE)http://localhost:3000/api/schedule/deleteSchedule?_id=6471a80fb8c1bdcb0a800b18
exports.deleteSchedule = async (req, res) => {
  try {
    // get the id from the request params
    const { id } = req.params;

    // find and delete the schedule by id using the schema
    await Schedule.findByIdAndDelete(id);

    // send a success response with a message
    res.status(200).json({
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    // handle any errors
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

// Find all groups on a specific day of the week
// (GET)http://localhost:3000/api/schedule/groups?dayOfWeek=1
exports.findAllGroupsInDay = async (req, res) => {
  try {
    const { dayOfWeek } = req.query;
    const groups = await Schedule.find({ day_of_week: dayOfWeek }).distinct(
      "group"
    );
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve groups" });
  }
};

// Find all students in a specific group
// (GET)http://localhost:3000/api/schedule/group/:group  OXI AYTO
//http://localhost:3000/api/schedule/students?group="C1" BAD LOGIC
exports.findAllStudentsInGroup = async (req, res) => {
  try {
    const { group } = req.query;
    const students = await Schedule.find({ group: group }).populate(
      "students",
      "name"
    );
    res.json(students.map((schedule) => schedule.students).flat());
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve students" });
  }
};

// Find a lesson by lesson name
//(GET)http://localhost:3000/api/schedule/lesson?lesson=Writing
exports.findLesson = async (req, res) => {
  try {
    const { lesson } = req.query;
    const lessonSchedule = await Schedule.find({ lesson: lesson });
    if (!lessonSchedule) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.json(lessonSchedule);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve lesson" });
  }
};

// Find the teacher and group for a specific schedule ID  BAD
exports.findTeacherGroup = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const schedule = await Schedule.findById(scheduleId)
      .populate("teacher", "name")
      .select("teacher group");
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve teacher and group" });
  }
};

//(GET)http://localhost:3000/api/schedule/teacher/teacher1
//"error": "Failed to retrieve schedules"
exports.findSchedulesByTeacher = async (req, res) => {
  try {
    const { teacher } = req.params;
    const schedules = await Schedule.find({ teacher }).populate("teacher");
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve schedules" });
  }
};

//http://localhost:3000/api/schedule/group/"A1"
// []
exports.findSchedulesByGroup = async (req, res) => {
  try {
    const { group } = req.params;
    const schedules = await Schedule.find({ group }).populate("teacher");
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve schedules" });
  }
};

/*

// get the id of the schedule for group A1 and Math lesson
const schedule = await Schedule.findOne({ group: "A1", lesson: "Math" });
const id = schedule._id;

// update the schedule for group A1 and  lesson
const updatedSchedule = await Schedule.findByIdAndUpdate(
  id,
  {
    day_of_week: 2, // change to Tuesday
    start_time: "10:00", // change to 10:00 AM
    finish_time: "11:00", // change to 11:00 AM
    lesson: "Listening", // change to
    classroom: "1", // change to classroom 1
    teacher: "Teacher1", // change to Teacher1
  },
  { new: true }
); // return the updated document

// update the schedule for group A1 and  lesson
const updatedSchedule = await Schedule.updateOne(
  { group: "A1", lesson: "Math" },
  {
    day_of_week: 2, // change to Tuesday
    start_time: "10:00", // change to 10:00 AM
    finish_time: "11:00", // change to 11:00 AM
    lesson: "Writing", // change to
    classroom: "1", // change to classroom 1
    teacher: "Teacher1", // change to Teacher1
  },
  { new: true }
); // return the updated document

// update the schedule for Monday
const updatedSchedule = await Schedule.updateOne(
  { day_of_week: 1 },
  {
    // update fields here
  },
  { new: true }
);

// update the schedule for group A1
const updatedSchedule = await Schedule.updateOne(
  { group: "A1" },
  {
    // update fields here
  },
  { new: true }
);

// update the schedule for Monday and group A1
const updatedSchedule = await Schedule.updateOne(
  { day_of_week: 1, group: "A1" },
  {
    // update fields here
  },
  { new: true }
);

// update a schedule by day of week and group AYTO
exports.updateScheduleByDayAndGroup = async (req, res) => {
  try {
    // get the day of week and group from the request query
    const { day_of_week, group } = req.query;

    // get the data from the request body
    const { start_time, finish_time, lesson, classroom, teacher, students } =
      req.body;

    // find and update the schedule by day of week and group using the schema
    const updatedSchedule = await Schedule.updateOne(
      { day_of_week, group },
      {
        start_time,
        finish_time,
        lesson,
        classroom,
        teacher,
        students,
      },
      { new: true }
    ); // return the updated document

    // send a success response with the updated schedule object
    res.status(200).json({
      message: "Schedule updated successfully",
      data: updatedSchedule,
    });
  } catch (error) {
    // handle any errors
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};
*/
