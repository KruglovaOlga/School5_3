const User = require("../models/user.model");

//http://localhost:3000/api/user/findAll

exports.findAll = async (req, res) => {
  console.log("Find All system users");

  try {
    const result = await User.find({ category: "system" });
    res.status(200).json({ status: true, data: result });
    console.log("Success in reading users`");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in reading users", err);
  }
};

// Get a user by ID
//(GET)http://localhost:3000/api/user/getById/6450b9735da248f5e9a3091b
exports.getById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await User.findOne({ _id: id });
    if (!result) {
      return res.status(404).json({ status: false, data: "User not found" });
    }
    res.status(200).json({ status: true, data: result });
    console.log(`User find by ID ${id}`);
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
    console.log(`Error in finding user by ID ${id}`, err);
  }
};

// http://localhost:3000/api/user//getByUsername/system1
exports.getByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const result = await User.findOne({ username: username });
    if (!result) {
      return res.status(404).json({ status: false, data: "User not found" });
    }
    res.status(200).json({ status: true, data: result });
    console.log(`User find by username ${username}`);
  } catch (error) {
    res.status(500).json({ status: false, data: error.message });
    console.log(`Error in finding user by username ${username}`, err);
  }
};

exports.create = async (req, res) => {
  const data = req.body;

  console.log("Create new system user");

  let newUser = new User(data);

  try {
    const result = await newUser.save();
    res.status(201).json({ status: true, data: result });
    console.log(`User created with username ${username}`);
  } catch (err) {
    res.status(400).json({ status: false, data: err.message });
    console.log(`Error in creating user with username ${username}`, err);
  }
};

exports.update = async (req, res) => {
  const data = req.body;

  console.log("Update User");

  try {
    const result = await User.findOneAndUpdate(
      { username: data.username },
      {
        role: data.role,
        category: data.category,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      },
      { new: true }
    );
    res.status(201).json({ status: true, data: result });
    console.log(`User updated with username ${data.username}`);
  } catch (err) {
    res.status(500).json({ status: false, data: err });
    console.log(`Error in updating user with username ${data.username}`, err);
  }
};

// Delete a user by ID
//http://localhost:3000/api/user/deleteUser/id/6453c1f53514d7a815fc44a0
exports.deleteById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findOne({ _id: id });
    if (!result) {
      return res.status(404).json({ status: false, data: "User not found" });
    } else {
      await User.findOneAndRemove({ _id: id }, { new: false });
    }
    res.json({ status: true, data: "User deleted successfully" });
    console.log(`User deleted by id ${id}`);
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
    console.log(`Error in deleting user with id ${username}`, err);
  }
};

//(DELETE)http://localhost:3000/api/user/delete/username/student015
exports.deleteByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const result = await User.findOne({ username: username });

    if (!result) {
      return res.status(404).json({ status: false, data: "User not found" });
    } else {
      await User.findOneAndRemove({ username: username }, { new: false });
    }
    res.json({ status: true, data: "User deleted successfully" });
    console.log(`User deleted by username ${username}`);
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
    console.log(`Error in deleting user with username ${username}`, err);
  }
};
