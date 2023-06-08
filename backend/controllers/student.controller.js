const Student = require("../models/student.model");

//http://localhost:3000/api/student/findAll  OK
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

// Get a student by ID
//(GET)http://localhost:3000/api/student/getById/6450b9735da248f5e9a3091b   OK
exports.getById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Student.findOne({ _id: id });
    if (!result) {
      return res.status(404).json({ status: false, data: "Student not found" });
    }

    res.status(200).json({ status: true, data: result });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
};

// http://localhost:3000/api/student/getByUsername/student027   OK
exports.getByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const result = await Student.findOne({ username: username });
    if (!result) {
      return res.status(404).json({ status: false, data: "Student not found" });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, data: error.message });
  }
};

/*
 using object destructuring to only 
allow the fields that are defined in student.model to be saved
 to the database. */
// {"username": "student014",
// "password": "Student",
// "role": "reader",
// "category": "student",
// "firstname": "George",
// "lastname": "Karamanis",
// "group": "B2",
// "grades": [
//     {
//         "semester": "1",
//         "listening": "96",
//         "writing": "91",
//         "speaking": "100",
//         "reading": "100",
//         "grammar": "94"
//     },
//      {
//         "semester": "2",
//         "listening": "96",
//         "writing": "91",
//         "speaking": "100",
//         "reading": "100",
//         "grammar": "94"
//     }, {
//         "semester": "3",
//         "listening": "96",
//         "writing": "91",
//         "speaking": "100",
//         "reading": "100",
//         "grammar": "94"
//     }, {
//         "semester": "4",
//         "listening": "96",
//         "writing": "91",
//         "speaking": "100",
//         "reading": "100",
//         "grammar": "94"
//     }
// ],
// "email": "karamanis014@fls.gr",
// "tuition": [
//     {
//         "installment": "1",
//         "amount": "54,00",
//         "date": "2023-01-24",
//         "status": true
//     },
//     {
//         "installment": "2",
//         "amount": "54,00",
//         "date": "2023-02-24",
//         "status": true
//     },
//     {
//         "installment": "3",
//         "amount": "54,00",
//         "date": "2023-03-24",
//         "status": true
//     },
//     {
//         "installment": "4",
//         "amount": "54,00",
//         "date": "2023-04-24",
//         "status": true
//     },
//     {
//         "installment": "5",
//         "amount": "54,00",
//         "date": "2023-05-24",
//         "status": true
//     },
//     {
//         "installment": "6",
//         "amount": "",
//         "date": "",
//         "status": false
//     },
//     {
//         "installment": "7",
//         "amount": "",
//         "date": "",
//         "status": false
//     },{
//         "installment": "8",
//         "amount": "",
//         "date": "",
//         "status": false
//     },{
//         "installment": "9",
//         "amount": "",
//         "date": "",
//         "status": false
//     }
// ],
// "address": [
//     {
//         "area": "area14",
//         "road": "road014"
//     }
// ],
// "phone": [
//     {
// "home": "6930750014",
// "mobile": "210070014"
//     }]

// }

exports.create = async (req, res) => {
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

    const newStudent = new Student({
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
    const result = await newStudent.save();
    console.log("Insert student with username", req.body.username);

    res.status(201).json({ success: true, data: result });
    console.log(`Success in creating student with username ${username}`);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    console.log(`Problem in creating student with username ${username}`, err);
  }

  //   await newStudent.save();
  //   console.log("Insert student with username", req.body.username);

  //   res.status(201).json({ success: true, data: student });
  //   console.log(`Success in creating student with username ${username}`);
  // } catch (error) {
  //   res.status(400).json({ success: false, error: error.message });
  //   console.log(`Problem in creating student with username ${username}`, err);
  // }
};

//(Patch)http://localhost:3000/api/student/update/student013  OK
exports.update = async (req, res) => {
  console.log("Update Student");
  const username = req.params.username;

  const data = req.body;

  try {
    let result = await Student.findOneAndUpdate(
      { username: username },
      {
        role: data.role,
        category: data.category,
        firstname: data.firstname,
        lastname: data.lastname,
        class: data.class,
        grades: data.grades,
        email: data.email,
        tuition: data.tuition,
        address: data.address,
        phone: data.phone,
      },
      { new: true }
    );
    res.status(201).json({ status: true, data: result });
  } catch (err) {
    res.status(500).json({ status: false, data: err });
    console.log(`Error in updating student with username ${username}`, err);
  }
};

//http://localhost:3000/api/student/deleteById/   OK
exports.deleteById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Student.findOne({ _id: id });

    if (!result) {
      return res.status(404).json({ status: false, data: "Student not found" });
    } else {
      await Student.findOneAndRemove({ _id: id }, { new: false });
    }
    res.json({ status: true, data: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
};

//http://localhost:3000/api/student/deleteByUsername/sys OK
exports.deleteByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const result = await Student.findOne({ username: username });

    if (!result) {
      return res.status(404).json({ status: false, data: "Student not found" });
    } else {
      await User.findOneAndRemove({ username: username }, { new: false });
    }
    res.json({ status: true, data: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
};

//Update by username

// //http://localhost:8080/api/user/updateUserByUsername/student/student015
// // {

// // "username":"student015",
// // "role": "reader",
// // "category": "student",
// // "firstname":"Alex",
// // "lastname": "Windos",
// // "class":"C1",
// // "grades":[
// //     {
// //         "semester": "1",
// //     "listening": "96",
// //     "writing": "91",
// //     "speaking": "100",
// //     "reading": "100",
// //     "grammar": "94"}
// // ],
// // "email":"windos015@fls.gr",
// // "tuition":[
// //     {"installment": "3",
// //     "amount": "54,00",
// //     "date": "21-12-23",
// //     "status":"true" }
// // ],
// //     "address": [
// //         {"area": "area9",
// //         "road": "road9"}
// //     ],
// //     "phone": [
// //         {"home": "6939153399",
// //         "mobile": "21099015399"}
// //     ]
// // }
// exports.updateStudentByUsername = async (username, userData, res) => {
//   console.log("Update Student by Usename", username);
//   try {
//     let updatedStudent = await Student.findOneAndUpdate(
//       { username: username },
//       {
//         role: userData.role,

//         category: userData.category,

//         firstname: userData.firstname,

//         lastname: userData.lastname,
//         class: userData.class,
//         grades: userData.grades,

//         email: userData.email,
//         tuition: userData.tuition,

//         address: userData.address,

//         phone: userData.phone,
//       },
//       { new: true }
//     );
//   } catch (err) {
//     res.status(500).json({ status: false, data: err });
//     console.log(`Error in updating student with username ${username}`, err);
//   }
// };

// // Find students with unpaid installments
// //http://localhost:3000/api/user/unpaid  BAD LOGIC
// exports.findNoPaidInstallment = async (req, res) => {
//   try {
//     const students = await Student.find({ "tuition.status": false });
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve students" });
//   }
// };

//http://localhost:3000/api/student/unpaid/student007   OK
exports.findInstallmentsByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const student = await Student.findOne({ username });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const unpaidInstallments = student.tuition.filter(
      (tuition) => !tuition.status
    );
    res.json(unpaidInstallments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve installments" });
  }
};

// Get all grades for a particular student
//http://localhost:3000/api/student/grades/student006  OK
exports.getAllGrades = async (req, res) => {
  const { username } = req.params;
  try {
    const student = await Student.findOne({ username });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student.grades);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve grades" });
  }
};

// Get grades for students by semester
//http://localhost:3000/api/student/grades/student006/1      Cannot read properties of undefined (reading 'semester')   OR   error: "Failed to retrieve grades"
exports.getGradesBySemester = async (req, res) => {
  const { username } = req.params;

  try {
    const student = await Student.findOne({ username });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    // try {

    //   const students = await Student.find(
    //     { "grades.semester": semester },
    //     "firstname lastname grades"
    //   );
    const { semester } = req.prams;
    const grades = student.grades.filter((semester) => ({
      "grades.semester": semester,
      //semester: grades.semester,
    }));
    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve grades" });
  }
};

//http://localhost:3000/api/student/findStudentsByGroup/A2  OK
exports.findStudentsByGroup = async (req, res) => {
  const group = req.params.group;
  try {
    //const { group } = req.params;
    const students = await Student.find({ group: group });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve students" });
  }
};

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
