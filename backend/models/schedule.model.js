const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  day_of_week: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6],
    required: [true, "Day of week is required field"],
  },
  start_time: {
    type: String,
    // match: /^\d{2}:\d{2}$/, // regex to match HH:MM format
    required: [true, "Start time is required field"],
  },
  finish_time: {
    type: String,
    //match: /^\d{2}:\d{2}$/, // regex to match HH:MM format
    required: [true, "Finish time is required field"],
  },
  lesson: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: [true, "Lesson is required field"],
  },
  group: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: [true, "Group is required field"],
  },
  classroom: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: [true, "Classroom is required field"],
  },
  teacher: {
    type: String,
    minlength: 1,
    maxlength: 50,
    ref: "Teacher",
    required: [true, "Teacher is required field"],
  },
  students: [
    {
      //type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: "Student",
    },
  ],
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
//module.exports = mongoose.model("Schedule", scheduleSchema);
