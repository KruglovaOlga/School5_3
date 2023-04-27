const Student = require("../models/student.model");

exports.findAll = async function (req, res) {
  console.log("Find All Controller");

  try {
    const results = await Student.find({});
    res.status(200).json({ status: true, data: results });
    console.log("Success in reading users");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log("Problem in reading users", err);
  }
};

exports.findOne = async function (req, res) {
  const username = req.params.username;
  console.log("Find student with username", username);

  try {
    const result = await Student.findOne({ username: username });
    res.status(200).json({ status: true, data: result });
    console.log(`Success in creating student with username ${username}`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log(`Problem in creating student with username ${username}`, err);
  }
};

exports.create = function (req, res) {
  const newStudent = new Student({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    category: req.body.category,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    class: req.body.class,
    grades: req.body.grades,
    email: req.body.email,
    tuition: req.body.tution,
    address: req.body.address,
    phone: req.body.phone,
  });

  console.log("Insert student with username", req.body.username);

  newStudent.save((err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log(`Problem in finding student with username ${username}`, err);
    } else {
      res.status(200).json({ status: true, data: result });
      console.log(`Success in finding student with username ${username}`);
    }
  });
};

exports.update = function (req, res) {
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

exports.delete = function (req, res) {
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
