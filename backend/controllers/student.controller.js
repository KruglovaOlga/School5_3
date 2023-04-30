const Student = require("../models/student.model");

exports.findAll = async function (req, res) {
  console.log("Find All Students Controller");

  try {
    const results = await Student.find({});
    res.status(200).json({ status: true, data: results });
    console.log("Success in reading students");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in reading students", err);
  }
};

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

exports.updateStudentByUsername = function (req, res) {
  const username = req.body.username;
  const updateStudent = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    class: req.body.class,
    grades: req.body.grades,
    email: req.body.email,
    tuition: req.body.tution,
    address: req.body.address,
    phone: req.body.phone,
  };

  Student.findOneAndUpdate(
    { username: username },
    updateStudent,
    { new: true },
    (err, result) => {
      if (err) {
        res.status(400).json({ status: false, data: err });
        console.log(
          `Problem in updating student with username ${username}`,
          err
        );
      } else {
        res.status(200).json({ status: true, data: result });
        console.log(`Success in updating student with username ${username}`);
      }
    }
  );
};

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

module.exports = {
  findAll,
  getStudentById,
  getStudentByUsername,
  createStudent,
  updateStudentByUsername,
  updateStudentById,
  deleteStudent,
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
