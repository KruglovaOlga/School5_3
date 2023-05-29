const User = require("../models/user.model");
const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model");
const teacherController = require("../controllers/teacher.controller");
const studentController = require("../controllers/student.controller");

// Create a new user
//(POST)http://localhost:3000/api/user/createUser/student
//http://localhost:3000/api/user/createUser/teacher
// {
//   "username":"teacher7",
//   "password":"Teacher",
//   "role":"editor",
//   "category":"teacher",
//   "firstname":"Kosmas",
//   "lastname":"Mavidis",
//   "email":"teacher7@fls.gr",
//   "address":
//              {"area": "area7",
//              "road": "road7"}
//          ,
//   "phone": [
//              {"home": "6937753377",
//              "mobile": "21077015377"}
//   ]
//   }

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

//Returns User Id for using in other functions
//(GET)http://localhost:3000/api/user/getUserId/teacher/Avramidoy/Elisavet
//http://localhost:3000/api/user/getUserId/student/Karamanidis/George
exports.getUserId = async (req, res) => {
  try {
    const category = req.params.category;
    const lastname = req.params.lastname;
    const firstname = req.params.firstname;

    let user;
    // const user = await User.findOne({ $or: [{ lastname: lastname }, { firstname: firstname }, { category: category }, { email: email }] });
    if (category === "student") {
      user = await Student.findOne({
        lastname: lastname,
        firstname: firstname,
        category: category,
      });
      return res.json({ id: user._id }); // send response to client
    } else if (category === "teacher") {
      user = await Teacher.findOne({
        lastname: lastname,
        firstname: firstname,
        category: category,
      });
      return res.json({ id: user._id }); // send response to client
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get a user by ID
//(GET)http://localhost:3000/api/user/getUserById/6450b9735da248f5e9a3091b

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({ _id: id });
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

// http://localhost:3000/api/user//getUserByUsername/teacher1
//http://localhost:3000/api/user//getUserByUsername/student002
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
//(PATCH)http://localhost:3000/api/user/updateUserById/6450c3160abf1770e90f0b3c/teacher
//http://localhost:3000/api/user/updateUserById/645270472043f8d62f01ff91/student
// {

//   "username":"student006",
//   "role": "reader",
//   "category": "student",
//   "firstname":"George",
//   "lastname": "Karamanidis",
//   "class":"JunB2",
//   "grades":[
//       {
//           "semester": "1",
//       "listening": "96",
//       "writing": "91",
//       "speaking": "100",
//       "reading": "100",
//       "grammar": "94"}
//   ],
//   "email":"karamanidis006@fls.gr",
//   "tuition":[
//       {"installment": "3",
//       "amount": "54,00",
//       "date": "2023-05-24",
//       "status":"true" }
//   ],
//       "address": [
//           {"area": "area6",
//           "road": "road06"}
//       ],
//       "phone": [
//           {"home": "6939153366",
//           "mobile": "21099015366"}
//       ]

// }

exports.updateUserById = async (req, res) => {
  const category = req.params.category; // get category from params

  const id = req.params.id; // get username from params

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
// {
//   "username":"teacher6",
//   "role":"editor",
//   "category":"teacher",
//   "firstname":"Kyriaki",
//   "lastname":"Moustaki",
//   "email":"teacher6@fls.gr",
//   "address": [
//              {"area": "area6",
//              "road": "road6"}
//          ],
//   "phone": [
//              {"home": "6936653366",
//              "mobile": "21066015366"}
//          ]
//   }
//(PATCH)http://localhost:3000/api/user/updateUserByUsername/student010/student
//(PATCH)http://localhost:3000/api/user/updateUserByUsername/teacher8/teacher
exports.updateUserByUsername = async (req, res) => {
  const category = req.params.category; // get category from params

  const username = req.params.username; // get username from params

  const userData = req.body;

  let updatedUser;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (category === "student") {
      updatedUser = await studentController.updateStudentByUsername(
        username,

        userData,

        {
          new: true,
        }
      );
    } else if (category === "teacher") {
      updatedUser = await teacherController.updateTeacherByUsername(
        username,
        userData
      );
    }
    // check the value of updatedUser and send appropriate response
    //     if (updatedUser) {
    //       // if updatedUser is not null or undefined, send 200 status and updated user data
    //       res.status(200).json({ status: true, data: updatedUser });
    //       console.log(`Success in updating user with username ${username}`);
    //     } else {
    //       // if updatedUser is null or undefined, send 404 status and error message
    //       res.status(404).json({ status: false, data: "user not found" });
    //       console.log(`User with username ${username} not found`);
    //     }
    //

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user by ID
//http://localhost:3000/api/user/deleteUser/id/6453c1f53514d7a815fc44a0
exports.deleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      await User.findOneAndRemove({ _id: id }, { new: false });
    }
    res.json({ message: "User deleted successfully", data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//(DELETE)http://localhost:3000/api/user/delete/username/student015
exports.deleteUserByUsername = async (req, res) => {
  const { username } = req.params;
  // const username = req.params.username;
  //   const user = await User.findOne({ username });
  try {
    const user = await User.findOne({ username: username });

    //const user = await User.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      await User.findOneAndRemove({ username: username }, { new: false });
    }
    res.json({ message: "User deleted successfully", data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Delete a user by Username
//http://localhost:3000/api/user/delete/username/teacher7
// exports.deleteUserByUsername = async (req, res) => {
//   const { username } = req.params;
//   try {
//     const user = await User.findOneAndRemove(
//       { username: username },
//       { new: false }
//     );
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     } else {
//       res.json({ message: "User deleted successfully", data: user });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

/*req.body is used to access the actual
 form data that you posted, while req.params is used for route parameters
  that are passed in the URL. For example, if you have the route /user/:name, 
  then the name property is available as req.params.name. In your case, category 
  is a route parameter, so you should use req.params.category to access it.
*/
