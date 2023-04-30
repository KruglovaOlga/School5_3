const User = require("../models/user.model");
const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model");

// Create a new user
const createUser = async (req, res) => {
  const { role, ...userData } = req.body;
  let newUser;
  if (role === "student") {
    newUser = new Student(userData);
  } else if (role === "teacher") {
    newUser = new Teacher(userData);
  } else {
    newUser = new User(userData);
  }
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  const { role } = req.query;
  let users;

  try {
    if (role === "student") {
      users = await Student.findAll();
    } else if (role === "teacher") {
      users = await Teacher.findAll();
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  const { role } = req.query;
  const { id } = req.params;
  let user;

  try {
    if (role === "student") {
      user = await Student.findById(id);
    } else if (role === "teacher") {
      user = await Teacher.findById(id);
    } else {
      user = await User.findById(id);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
  In this method, we first extract the username from the request 
  parameters. We then use the findOne() method of the User model 
  to find the user by their username. If the user is not found, 
  we return a 404 error response. If the user is found, 
  we return a 200 response with the user data in the response body.
  */

exports.getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { role, ...userData } = req.body;
  let updatedUser;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (role === "student") {
      updatedUser = await Student.findByIdAndUpdate(id, userData, {
        new: true,
      });
    } else if (role === "teacher") {
      updatedUser = await Teacher.findByIdAndUpdate(id, userData, {
        new: true,
      });
    } else {
      updatedUser = await User.findByIdAndUpdate(id, userData, {
        new: true,
      });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a user by Username
const updateUserByUsername = async (req, res) => {
  const { username } = req.params;
  const { role, ...userData } = req.body;
  let updatedUser;
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (role === "student") {
      updatedUser = await Student.findByUsernameAndUpdate(username, userData, {
        new: true,
      });
    } else if (role === "teacher") {
      updatedUser = await Teacher.findByUsernameAndUpdate(username, userData, {
        new: true,
      });
    } else {
      updatedUser = await User.findByUsernameAndUpdate(username, userData, {
        new: true,
      });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "student") {
      await Student.findByIdAndDelete(id);
    } else if (user.role === "teacher") {
      await Teacher.findByIdAndDelete(id);
    } else {
      await User.findByIdAndDelete(id);
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user by Username
const deleteUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "student") {
      await Student.findByUsernameAndDelete(username);
    } else if (user.role === "teacher") {
      await Teacher.findByUsernameAndDelete(username);
    } else {
      await User.findByUsernameAndDelete(username);
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByUsername,
  updateUserById,
  updateUserByUsername,
  deleteUserById,
  deleteUserByUsername,
};
