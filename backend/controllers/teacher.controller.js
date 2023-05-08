const Teacher = require("../models/teacher.model");

// exports.findAll = async function (req, res) {
//   // find all users with category teacher from the database
//   users.find({ category: "teacher" }, (err, users) => {
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
//   return User.findAll({ where: { category: "teacher" } });
// };

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

exports.getTeacherById = async (req, res) => {
  console.log("Get Teacher by Id Controller");
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      res.status(404).json({ success: false, error: "Teacher not found" });
    } else {
      res.status(200).json({ success: true, data: teacher });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getTeacherByUsername = async (req, res) => {
  console.log("Get Teacher by Username Controller");
  try {
    const teacher = await Teacher.findByUsername(req.params.username);
    if (!teacher) {
      res.status(404).json({ success: false, error: "Teacher not found" });
    } else {
      res.status(200).json({ success: true, data: teacher });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// exports.findOne = function (_req, res) {
//   console.log("Find One Controller");
//   res.json({ status: true, data: "Find One Controller" });
// };

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
exports.updateTeacherByUsername = async (req, res) => {
  console.log("Update Teacher by username Controller");

  const username = req.body.username;
  const updateTeacher = {
    role: req.body.role,
    category: req.body.category,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
  };

  Teacher.findOneAndUpdate(
    { username: username },
    updateTeacher,
    { new: true },
    (err, result) => {
      if (err) {
        res.status(400).json({ status: false, data: err });
        console.log(
          `Problem in updating teacher with username ${username}`,
          err
        );
      } else {
        res.status(200).json({ status: true, data: result });
        console.log(`Success in updating teacher with username ${username}`);
      }
    }
  );
};

//   try {
//     const user = await Teacher.findOneAndUpdate(
//       { username },
//       { role, category, firstname, lastname, email, address, phone },
//       { new: true }
//     );
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// update by id
exports.updateTeacherById = async (req, res) => {
  console.log("Update Teacher by Id Controller");
  try {
    const { id } = req.params;
    const allowedFields = [
      "username",
      "password",
      "role",
      "category",
      "firstname",
      "lastname",
      "email",
      "phone",
      "address",
    ];
    const updateObj = {};
    for (let field of allowedFields) {
      if (req.body[field]) {
        updateObj[field] = req.body[field];
      }
    }
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateObj, {
      new: true,
    });
    if (!updatedTeacher) {
      return res
        .status(404)
        .json({ success: false, error: "Teacher not found" });
    }
    res.status(200).json({ success: true, data: updatedTeacher });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteTeacher = function (req, res) {
  const username = req.params.username;
  console.log("Delete teacher ", username);

  Teacher.findOneAndDelete({ username: username }, (err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log(`Problem in deleting teacher with username ${username}`, err);
    } else {
      res.status(200).json({ status: true, data: result });
      console.log(`Success in deleting teacher with username ${username}`);
    }
  });
};

// module.exports = {
//   findAll,
//   getTeacherById,
//   getTeacherByUsername,
//   createTeacher,
//   updateTeacherByUsername,
//   updateTeacherById,
//   deleteTeacher,
// };

/********************************************************************** */

// // UPDATE
// exports.updateTeacher = async (req, res) => {
//   try {
//     const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!teacher) {
//       res.status(404).json({ success: false, error: "Teacher not found" });
//     } else {
//       res.status(200).json({ success: true, data: teacher });
//     }
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

/******************************************************************* */
// exports.updateTeacher = async (req, res) => {
//   try {
//     const teacher = await Teacher.findByUsername(req.params.username);
//     if (!teacher) {
//       res.status(404).json({ success: false, error: "Teacher not found" });
//     } else {
//       await Teacher.updateOne({ _id: teacher._id }, req.body);
//       res.status(200).json({ success: true, message: "Teacher updated successfully" });
//     }
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

/********************************************************* 
// teacherSchema.statics.findByUsername = async function (username) {
//   const teacher = await this.findOne({ username });
//   return teacher;
// };
*/
