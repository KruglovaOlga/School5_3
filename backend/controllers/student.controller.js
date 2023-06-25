const Student = require("../models/student.model");

exports.findAll = async function (req, res) {
  console.log("Find All Students Controller");

  try {
    const result = await Student.find({ category: "student" });
    res.status(200).json({ status: true, data: result });
    console.log("Success in reading students");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in reading students", err);
  }
};

// Get a student by ID
//(GET)http://localhost:3000/api/student/getById/6450b9735da248f5e9a3091b
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

// http://localhost:3000/api/student/getByUsername/system1
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
exports.create = async (req, res) => {
  console.log("Create Student Controller");
  
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
    group
  } = req.body;

  try {
    
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
      group
    });
    
    const result = await newStudent.save();
    console.log("Insert student with username", req.body.username);

    res.status(201).json({ success: true, data: result });
    console.log(`Success in creating student with username ${username}`);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
    console.log(`Problem in creating student with username ${username}`, error);
  }
};

exports.update = async (req, res) => {
  console.log("Update Student");

  const data = req.body;

  try {
    let result = await Student.findOneAndUpdate(
      { username: data.username },
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
        group: data.group,
      },
      { new: true }
    );
    res.status(201).json({ status: true, data: result });
    console.log(`Student with username ${data.username} updated `);
  } catch (err) {
    res.status(500).json({ status: false, data: err });
    console.log(`Error in updating student with username ${data.username}`, err);
  }
};

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
    console.log(`Student deleted by id ${id}`);
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
    console.log(`Error in deleting Student with id ${id}`, err)
  }
};

exports.deleteByUsername = async (req, res) => {
  const username = req.params.username;

  console.log("Delete Student", req.params.username);

  try {
    const result = await Student.findOne({ username: username });

    if (!result) {
      return res.status(404).json({ status: false, data: "Student not found" });
    } else {
      await Student.findOneAndRemove({ username: username }, { new: false });
    }
    res.json({ status: true, data: "Student deleted successfully" }); 
    console.log(`Student deleted by username ${username}`);   
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
    console.log(`Error in deleting Student with username ${username}`, err)
  }
};