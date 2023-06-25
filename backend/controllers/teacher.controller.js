const Teacher = require("../models/teacher.model");

exports.findAll = async function (req, res) {
  console.log("Find All Teacher Controller");

  try {
    const result = await Teacher.find({ category: "teacher" });
    res.status(200).json({ status: true, data: result });
    console.log("Success in reading teachers");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in reading teachers", err);
  }
};

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

exports.create = async (req, res) => {
  console.log("Create Teacher Controller", req.body.username);
  
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

  try {
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
};

exports.update = async (req, res) => {
  console.log("Update Teacher");

  const data = req.body;

  console.log(data);
  try {
    let result = await Teacher.findOneAndUpdate(
      { username: data.username },
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
    console.log(`Teacher with username ${data.username} updated `);
  } catch (err) {
    res.status(500).json({ status: false, data: err });
    console.log(`Error in updating teacher with username ${data.username}`, err);
  }
};

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
    console.log(`Student deleted by id ${id}`);
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
    console.log(`Error in deleting Student with id ${id}`, err)
  }
};

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
    console.log(`Student deleted by username ${username}`);   
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
    console.log(`Error in deleting Student with username ${username}`, err)
  }
};