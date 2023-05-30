const Student = require("../models/student.model");

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

// "username":"student015",
// "role": "reader",
// "category": "student",
// "firstname":"Alex",
// "lastname": "Windos",
// "class":"C1",
// "grades":[
//     {
//         "semester": "1",
//     "listening": "96",
//     "writing": "91",
//     "speaking": "100",
//     "reading": "100",
//     "grammar": "94"}
// ],
// "email":"windos015@fls.gr",
// "tuition":[
//     {"installment": "3",
//     "amount": "54,00",
//     "date": "21-12-23",
//     "status":"true" }
// ],
//     "address": [
//         {"area": "area9",
//         "road": "road9"}
//     ],
//     "phone": [
//         {"home": "6939153399",
//         "mobile": "21099015399"}
//     ]
// }
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
  } catch (err) {
    res.status(500).json({ status: false, data: err });
    console.log(`Error in updating student with username ${username}`, err);
  }
};

exports.findNoPaidInstallment = async (req, res) => {};
exports.getAllGrades = async (req, res) => {};
exports.getGradesBySemester = async (req, res) => {};

// exports.findStudentsByGroup = async (req, res) => {
//   const { group } = req.params; // get the group parameter from the request
//   try {
//     const students = await Student.find({ class: group }); // find all students that match the group parameter
//     if (!students || students.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No students found in this group" });
//     } else {
//       res.json({ message: "Students found successfully", data: students });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

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
