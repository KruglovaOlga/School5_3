const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
      default: 'editor',
    },
    category: {
      type: String,
      default: 'teacher',
    },
    firstname: {
      type: String,
      required: [true, "Firstname is required field"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required field"],
    },
    email: {
      type: String,
      required: [true, "Email is required field"],
      max: 100,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      // validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email address is not valid",
      ],
    },
    address: addressSchema,
    phone: [phoneSchema],
  },
  {
    collection: "user",
    timestamps: true,
  }
);

teacherSchema.plugin(uniqueValidator);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;

//https://www.mongodb.com/docs/manual/indexes/#single-field

/*Sparse indexes only contain entries for documents that have the indexed field, 
even if the index field contains a null value. The index skips over any document 
that is missing the indexed field. The index is “sparse” because it does not 
include all documents of a collection. By contrast, non-sparse indexes contain 
all documents in a collection, 
storing null values for those documents that do not contain the indexed field.
*/
