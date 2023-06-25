const { default: mongoose } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
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
      default: "administrator",
    },
    category: {
      type: String,
      default: 'system',
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

      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email address is not valid",
      ],
    },
  },
  {
    collection: "user",
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
