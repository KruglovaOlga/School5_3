const Teacher = require("../models/teacher.model");

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

/*
 using object destructuring to only 
allow the fields that are defined in teacher.model to be saved
 to the database. */
exports.createTeacher = async (req, res) => {
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

    await newTeacher.save();
    console.log("Insert teacher with username", req.body.username);

    res.status(201).json({ success: true, data: teacher });
    console.log(`Success in creating teacher with username ${username}`);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    console.log(`Problem in creating teacher with username ${username}`, err);
  }
};

// update by username

exports.updateTeacherByUsername = async (username, userData) => {
  console.log("Update Teacher by username Controller ", username);

  let result = await Teacher.findOneAndUpdate(
    { username: username },

    {
      role: userData.role,

      category: userData.category,

      firstname: userData.firstname,

      lastname: userData.lastname,

      email: userData.email,

      address: userData.address,

      phone: userData.phone,
    }
  );

  return result;
};
