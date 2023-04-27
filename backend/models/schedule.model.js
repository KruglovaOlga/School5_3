const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  day_of_week: {
    type: String,
    required: [true, "Day of week is required field"],
  },
  start_time: {
    type: String,
    required: [true, "Start time is required field"],
  },
  finish_time: {
    type: String,
    required: [true, "Finish time is required field"],
  },
  lesson: {
    type: String,
    required: [true, "Lesson is required field"],
  },
  group: {
    type: String,
    required: [true, "Group is required field"],
  },
  classroom: {
    type: String,
    required: [true, "Classroom is required field"],
  },
  teacher: {
    type: String,
    ref: "Teacher",
    required: [true, "Teacher is required field"],
  },
  students: [
    {
      type: String,
      ref: "Student",
    },
  ],
});

module.exports = mongoose.model("Schedule", scheduleSchema);
