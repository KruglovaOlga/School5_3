const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let emailSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email address is not valid",
    ],
    unique: true, // make email field unique
  },
});

let addressSchema = new mongoose.Schema(
  {
    area: { type: String },
    road: { type: String },
  },
  { _id: false }
);

let phoneSchema = new mongoose.Schema(
  {
    type: { type: String },
    number: { type: String },
  },
  { _id: false }
);

const teacherSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required field"],

      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required field"],
    },
    role: {
      type: String,
      required: [true, "Role is required field"],
    },
    category: {
      type: String,
      required: [true, "Category is required field"],
    },
    firstname: {
      type: String,
      required: [true, "Firstname is required field"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required field"],
    },
    email: emailSchema,
    address: addressSchema,
    phone: phoneSchema,
  },
  {
    collection: "user",
    timestamps: true,
  }
);

teacherSchema.plugin(uniqueValidator);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
