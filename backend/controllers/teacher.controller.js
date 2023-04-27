const Teacher = require("../models/teacher.model");

exports.findAll = function (req, res) {
  console.log("Find All Teachers");

  Teacher.find({}, (err, results) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log("Problem in reading users", err);
    } else {
      res.status(200).json({ status: true, data: results });
      console.log("Success in reading users");
    }
  });
};

exports.findOne = function (req, res) {
  console.log("Find One Controller");
  res.json({ status: true, data: "Find One Controller" });
};

exports.create = function (req, res) {
  const newTeacher = new Teacher({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
  });

  console.log("Insert teacher with username", req.body.username);

  newStudent.save((err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log(`Problem in creating teacher with username ${username}`, err);
    } else {
      res.status(200).json({ status: true, data: result });
      console.log(`Success in creating teacher with username ${username}`);
    }
  });
};

exports.update = function (req, res) {
  const username = req.body.username;
  const updateTeacher = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    class: req.body.class,
    grades: req.body.grades,
    email: req.body.email,
    tuition: req.body.tution,
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

exports.delete = function (req, res) {
  const username = req.params.username;
  console.log("Delete teacher ", username);

  Student.findOneAndDelete({ username: username }, (err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log(`Problem in deleting teacher with username ${username}`, err);
    } else {
      res.status(200).json({ status: true, data: result });
      console.log(`Success in deleting teacher with username ${username}`);
    }
  });
};
