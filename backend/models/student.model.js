const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let tuitionSchema = new mongoose.Schema(
  {
    installment: { type: String },
    amount: { type: String },
    date: { type: Date },
    status: { type: Boolean },
  },
  { _id: false }
);

let gradesSchema = new mongoose.Schema(
  {
    semester: { type: String },
    listening: { type: String },
    writing: { type: String },
    speaking: { type: String },
    reading: { type: String },
    grammar: { type: String },
    "use of english": { type: String },
  },
  { _id: false }
);

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

const studentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required field"],
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required field"],
    },
    role: {
      type: String,
      default: 'reader',
    },
    category: {
      type: String,
      default: 'student',
    },
    firstname: {
      type: String,
      required: [true, "Firstname is required field"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required field"],
    },
    group: {
      type: String,
      required: [true, "Class is required field"],
    },
    grades: { type: [gradesSchema], null: true },
    email: {
      type: String,
      required: [true, "Email is required field"],
      max: 100,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,

      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email address is not valid",
      ],
    },
    tuition: { type: [tuitionSchema], null: true },
    address: { type: [addressSchema], null: true },
    phone: [phoneSchema],
  },
  {
    collection: "user",
    timestamps: true,
  }
);

studentSchema.plugin(uniqueValidator);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
