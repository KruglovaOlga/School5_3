const Student = require("../models/student.model");

// exports.findAll = async function (req, res) {
//   // find all users with category student from the database
//   User.find({ category: "student" }, (err, users) => {
//     if (err) {
//       // send an error response
//       res.status(500).send(err);
//     } else {
//       // send a success response with the users data
//       res.status(200).send(users);
//     }
//   });
// };

// exports.findAll = async function (req, res) {
//   return User.findAll({ where: { category: "student" } });
// };

// async function findAll() {
//   try {
//     const users = await db
//       .collection("users")
//       .find({ category: "student" })
//       .toArray();
//     return users;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Could not find students.");
//   }
// }

//********************************************* */
exports.findAll = async function (req, res) {
  console.log("Find All Students Controller");

  try {
    const results = await Student.find({ category: "student" });
    res.status(200).json({ status: true, data: results });
    console.log("Success in reading students");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in reading students", err);
  }
};

//*************************************************** */

// exports.findOne = async function (req, res) {
//   const username = req.params.username;
//   console.log("Find student with username", username);
//   try {
//     const result = await Student.findOne({ username: username });
//     res.status(200).json({ status: true, data: result });
//     console.log(`Success in find student with username ${username}`);
//   } catch (err) {
//     res.status(400).json({ status: false, data: err });
//     console.log(`Problem in find student with username ${username}`, err);
//   }
// };

exports.getStudentById = async (req, res) => {
  console.log("Get Student by Id Controller");
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ success: false, error: "Student not found" });
    } else {
      res.status(200).json({ success: true, data: student });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getStudentByUsername = async (req, res) => {
  console.log("Get Student by Username Controller");
  try {
    const student = await Student.findByUsername(req.params.username);
    if (!student) {
      res.status(404).json({ success: false, error: "Student not found" });
    } else {
      res.status(200).json({ success: true, data: student });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// exports.create = function (req, res) {
//   const newStudent = new Student({
//     username: req.body.username,
//     password: req.body.password,
//     role: req.body.role,
//     category: req.body.category,
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     class: req.body.class,
//     grades: req.body.grades,
//     email: req.body.email,
//     tuition: req.body.tution,
//     address: req.body.address,
//     phone: req.body.phone,
//   });

//   console.log("Insert student with username", req.body.username);

//   newStudent.save((err, result) => {
//     if (err) {
//       res.status(400).json({ status: false, data: err });
//       console.log(`Problem in finding student with username ${username}`, err);
//     } else {
//       res.status(200).json({ status: true, data: result });
//       console.log(`Success in finding student with username ${username}`);
//     }
//   });
// };

/*
 using object destructuring to only 
allow the fields that are defined in student.model to be saved
 to the database. */
exports.createStudent = async (req, res) => {
  console.log("Create Student Controller");
  try {
    const {
      username,
      password,
      role,
      category,
      firstname,
      lastname,
      email,
      phone,
      address,
    } = req.body;

    const newTeacher = new Student({
      username,
      password,
      role,
      category,
      firstname,
      lastname,
      email,
      phone,
      address,
    });

    await newStudent.save();
    console.log("Insert student with username", req.body.username);

    res.status(201).json({ success: true, data: student });
    console.log(`Success in creating student with username ${username}`);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    console.log(`Problem in creating student with username ${username}`, err);
  }
};

//Update by username

//http://localhost:8080/api/user/updateUserByUsername/student/student015
// {

//   "username":"student015",
//   "role": "reader",
//   "category": "student",
//   "firstname":"Alex",
//   "lastname": "Windos",
//   "class":"C1",
//   "grades":[
//       {
//           "semester": "1",
//       "listening": "96",
//       "writing": "91",
//       "speaking": "100",
//       "reading": "100",
//       "grammar": "94"}
//   ],
//   "email":"windos015@fls.gr",
//   "tuition":[
//       {"installment": "3",
//       "amount": "54,00",
//       "date": "21-12-23",
//       "status":"true" }
//   ],
//       "address": [
//           {"area": "area9",
//           "road": "road9"}
//       ],
//       "phone": [
//           {"home": "6939153399",
//           "mobile": "21099015399"}
//       ]
//   }
exports.updateStudentByUsername = async (username, userData, res) => {
  console.log("Update Student by Usename", username);
  try {
    let updatedStudent = await Student.findOneAndUpdate(
      { username: username },
      {
        role: userData.role,

        category: userData.category,

        firstname: userData.firstname,

        lastname: userData.lastname,
        class: userData.class,
        grades: userData.grades,

        email: userData.email,
        tuition: userData.tuition,

        address: userData.address,

        phone: userData.phone,
      },
      { new: true }
    );

    // if (updatedStudent) {
    //   res.status(200).json({ success: true, data: updatedStudent });
    //   console.log(`Success in updating student with username ${username}`);
    // } else {
    //   res.status(404).json({ success: false, error: "Student not found" });
    //   console.log(`Student with username ${username} not found`);
    // }
  } catch (err) {
    res.status(500).json({ status: false, data: err });
    console.log(`Error in updating student with username ${username}`, err);
  }
};

// exports.updateStudentByUsername = function (req, res) {
//   const username = req.body.username;
//   const updateStudent = {
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     class: req.body.class,
//     grades: req.body.grades,
//     email: req.body.email,
//     tuition: req.body.tution,
//     address: req.body.address,
//     phone: req.body.phone,
//   };

//   Student.findOneAndUpdate(
//     { username: username },
//     updateStudent,
//     { new: true },
//     (err, result) => {
//       if (err) {
//         res.status(400).json({ status: false, data: err });
//         console.log(
//           `Problem in updating student with username ${username}`,
//           err
//         );
//       } else {
//         res.status(200).json({ status: true, data: result });
//         console.log(`Success in updating student with username ${username}`);
//       }
//     }
//   );
// };

// update by id
exports.updateStudentById = async (req, res) => {
  console.log("Update Student by Id Controller");
  try {
    const { id } = req.params;
    const allowedFields = [
      "username",
      "password",
      "role",
      "category",
      "firstname",
      "lastname",
      "class",
      "grades",
      "email",
      "tuition",
      "phone",
      "address",
    ];
    const updateObj = {};
    for (let field of allowedFields) {
      if (req.body[field]) {
        updateObj[field] = req.body[field];
      }
    }
    const updatedStudent = await Student.findByIdAndUpdate(id, updateObj, {
      new: true,
    });
    if (!updatedStudent) {
      return res
        .status(404)
        .json({ success: false, error: "Student not found" });
    }
    res.status(200).json({ success: true, data: updatedStudent });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteStudent = function (req, res) {
  const username = req.params.username;
  console.log("Delete student ", username);

  Student.findOneAndDelete({ username: username }, (err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log(`Problem in deleting student with username ${username}`, err);
    } else {
      res.status(200).json({ status: true, data: result });
      console.log(`Success in deleting student with username ${username}`);
    }
  });
};

//module.exports = {
// findAll,
//   getStudentById,
//   getStudentByUsername,
//   createStudent,
//   updateStudentByUsername,
//   updateStudentById,
//   deleteStudent,
//};

/*
In the findAll function, we use await to wait for the Student.find() method 
to complete and return the results. If an error occurs, 
we catch it with a try...catch block.

In the findOne function, we use await to wait for the Student.findById() method 
to complete and return the result for the specified id. 
If an error occurs, we catch it with a try...catch block.

Note that in the findOne function, we assume that the id parameter 
is passed as a request parameter in the URL, so we use req.params.id to retrieve it. 
If you're using a different parameter name or passing the 
id in a different way, you'll need to adjust the code accordingly.
*/

/************************************* */
// const Student = require("../models/student");

// exports.getUsers = async (req, res) => {
//   const { category } = req.query;
//   let users;

//   try {
//     if (category === "student") {
//       users = await Student.findAll();
//     } else if (category === "teacher") {
//       // Call Teacher model methods here
//     }

//     const userById = await Student.findOneById(1);
//     const userByUsername = await Student.findOneByUsername("johndoe");
//     const updatedUser = await Student.findOneAndUpdate(1, { name: "Jane Doe" });

//     res.status(200).json({
//       success: true,
//       data: users,
//       userById,
//       userByUsername,
//       updatedUser,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
