const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
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
    // firstname: {
    //   type: String,
    //   required: [true, "Firstname is required field"],
    // },
    // lastname: {
    //   type: String,
    //   required: [true, "Lastname is required field"],
    // },
  },
  {
    collection: "user",
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
