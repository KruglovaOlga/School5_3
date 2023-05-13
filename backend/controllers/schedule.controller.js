const Schedule = require("../models/schedule.model");
const Teacher = require("../models/teacher.model");
const Student = require("../models/student.model");

// create a new schedule document
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

// update a schedule by id
exports.updateSchedule = async (req, res) => {
  try {
    // get the id from the request params
    const { id } = req.params;

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

    // find and update the schedule by id using the schema
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      id,
      {
        day_of_week,
        start_time,
        finish_time,
        lesson,
        group,
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

// delete a schedule by id
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
