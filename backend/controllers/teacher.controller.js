const Teacher = require("../models/teacher.model");

//http://localhost:3000/api/teacher/findAll  OK
exports.findAll = async function (req, res) {
  console.log("Find All Teachers Controller");

  try {
    const results = await Teacher.find({ category: "teacher" });
    res.status(200).json({ status: true, data: results });
    console.log("Success in reading teachers");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in reading teachers", err);
  }
};

//http://localhost:3000/api/teacher/getById/6480d5a0eba340adc698fca2  OK
exports.getById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Teacher.findOne({ _id: id });
    if (!result) {
      return res.status(404).json({ status: false, data: "Teacher not found" });
    }

    res.status(200).json({ status: true, data: result });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
};

//http://localhost:3000/api/teacher/getByUsername/teacher8  OK
exports.getByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const result = await Teacher.findOne({ username: username });
    if (!result) {
      return res.status(404).json({ status: false, data: "Teacher not found" });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, data: error.message });
  }
};

/*
 using object destructuring to only 
allow the fields that are defined in teacher.model to be saved
 to the database. */
//(POST)http://localhost:3000/api/teacher/create  OK

// {"username":"teacher7",
// "password": "Teacher",
// "role": "editor",
//  "category": "teacher",
// "firstname":"Dyonisia",
// "lastname": "Kabily",
// "email":"teacher7@fls.gr",
//      "address":
//          {"area": "area7",
//          "road": "road7"} ,
//      "phone": [
//          {"home": "6930750707",
//          "mobile": "210070107"}
//      ]
//  }

exports.create = async (req, res) => {
  console.log("Create Teacher Controller");
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

    const newTeacher = new Teacher({
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

    const result = await newTeacher.save();
    console.log("Insert teacher with username", req.body.username);

    res.status(201).json({ success: true, data: result });
    console.log(`Success in creating teacher with username ${username}`);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    console.log(`Problem in creating teacher with username ${username}`, err);
  }

  //   await newTeacher.save();
  //   console.log("Insert teacher with username", req.body.username);

  //   res.status(201).json({ success: true, data: teacher });
  //   console.log(`Success in creating teacher with username ${username}`);
  // } catch (error) {
  //   res.status(400).json({ success: false, error: error.message });
  //   console.log(`Problem in creating teacher with username ${username}`, err);
  // }
};

// update by username

// exports.updateTeacherByUsername = async (username, userData) => {
//   console.log("Update Teacher by username Controller ", username);

//   let result = await Teacher.findOneAndUpdate(
//     { username: username },

//     {
//       role: userData.role,

//       category: userData.category,

//       firstname: userData.firstname,

//       lastname: userData.lastname,

//       email: userData.email,

//       address: userData.address,

//       phone: userData.phone,
//     }
//   );

//   return result;
// };

//http://localhost:3000/api/teacher/update/teacher7  OK BUT DOESN'T UPDATE PHONE(IF ONLY)
exports.update = async (req, res) => {
  console.log("Update Teacher");
  const username = req.params.username;

  const data = req.body;

  try {
    let result = await Teacher.findOneAndUpdate(
      { username: username },
      {
        role: data.role,
        category: data.category,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        address: data.address,
        phone: data.phone,
      },
      { new: true }
    );
    res.status(201).json({ status: true, data: result });
  } catch (err) {
    res.status(500).json({ status: false, data: err });
    console.log(`Error in updating teacher with username ${username}`, err);
  }
};

//(DELETE)http://localhost:3000/api/teacher/deleteById/64817d221d7f7d8422f4962b  OK
exports.deleteById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Teacher.findOne({ _id: id });

    if (!result) {
      return res.status(404).json({ status: false, data: "Teacher not found" });
    } else {
      await Teacher.findOneAndRemove({ _id: id }, { new: false });
    }
    res.json({ status: true, data: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
};

//(DELETE)http://localhost:3000/api/teacher/deleteByUsername/teacher7  OK
exports.deleteByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const result = await Teacher.findOne({ username: username });

    if (!result) {
      return res.status(404).json({ status: false, data: "Teacher not found" });
    } else {
      await Teacher.findOneAndRemove({ username: username }, { new: false });
    }
    res.json({ status: true, data: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
};
