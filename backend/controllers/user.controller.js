const User = require("../models/user.model");
const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model");
const teacherController = require("../controllers/teacher.controller");
const studentController = require("../controllers/student.controller");

// Create a new user
//http://localhost:3000/api/user/createUser/student
//http://localhost:3000/api/user/createUser/teacher
exports.createUser = async (req, res) => {
  const category = req.body.category;
  const userData = req.body;

  let newUser;

  if (category === "student") {
    newUser = new Student(userData);
  } else if (category === "teacher") {
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
  // db.user.dropIndex();
};

//http://localhost:3000/api/user/findAll/user?category=teacher
// http://localhost:3000/api/user/findAll/user?category=student
exports.findAll = async (req, res) => {
  // get the category from the request
  let category = req.query.category;
  // check if the category is teacher or student
  if (category === "teacher") {
    // call the teacherController findAll function
    teacherController.findAll(req, res);
  } else if (category === "student") {
    // call the studentController findAll function
    studentController.findAll(req, res);
  } else {
    // send an error response
    res.status(400).send("Invalid category");
  }
};

// exports.findAll = async (req, res) => {
//   const category = req.body.category;
//   if (category === "teacher") {
//     return teacherController.findAll();
//   } else if (category === "student") {
//     return studentController.findAll();
//   } else {
//     throw new Error("Invalid category");
//   }
// };

// Get all users
// exports.findAll = async (req, res) => {
//   const { category } = req.query;

//   try {
//     //let users = await User.findAll({ category: category });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     } else if (category === "student") {
//       return User.findAll({ where: { category: "student" } });
//       //users = await Student.findAll();
//     } else if (category === "teacher") {
//       return User.findAll({ where: { category: "teacher" } });
//       //users = await Teacher.findAll();
//     }

//     res.status(200).json({
//       success: true,
//       data: users,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// Get a user by ID
//64526f982043f8d62f01ff89  student
exports.getUserById = async (req, res) => {
  const { category } = req.query;
  const { id } = req.params;
  let user;

  try {
    if (category === "student") {
      user = await Student.findById(id);
    } else if (category === "teacher") {
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
// http://localhost:3000/api/user//getUserByUsername/Teacher1
//http://localhost:3000/api/user//getUserByUsername/Student026
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
exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const category = req.body.category;
  const userData = req.body;

  let updatedUser;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (category === "student") {
      updatedUser = await Student.findByIdAndUpdate(id, userData, {
        new: true,
      });
    } else if (category === "teacher") {
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
exports.updateUserByUsername = async (req, res) => {
  const { username } = req.params;
  //const category = req.body.category;
  const userData = req.body;

  let updatedUser;
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Ta parakato tha xreiastoun gia eisagvgh apo thn forma????

    // if (category === "student") {
    //   updatedUser = await Student.findOneAndUpdate(username, userData, {
    //     new: true,
    //   });
    // } else if (category === "teacher") {
    //   updatedUser = await Teacher.findOneAndUpdate(username, userData, {
    //     new: true,
    //   });
    // } else
    {
      updatedUser = await User.findOneAndUpdate(username, userData, {
        new: true,
      });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.category === "student") {
      await Student.findByIdAndDelete(id);
    } else if (user.category === "teacher") {
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
//http://localhost:8080/api/user/delete/username/teacher7
exports.deleteUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username });

    //const user = await User.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
      // }
      // if (user.category === "student") {
      //   await Student.findOneAndRemove({ username: username });
      //   //await Student.findByUsernameAndDelete(username);
      // } else if (user.category === "teacher") {
      //   await Teacher.findOneAndRemove({ username: username });
      //   //await Teacher.findByUsernameAndDelete(username);
    } else {
      await User.findOneAndRemove({ username: username });
      //await User.findByUsernameAndDelete(username);
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// module.exports = {
//   createUser,
//   getUsers,
//   getUserById,
//   getUserByUsername,
//   updateUserById,
//   updateUserByUsername,
//   deleteUserById,
//   deleteUserByUsername,
// };
