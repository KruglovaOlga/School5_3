const bcrypt = require("bcryptjs");
const config = require("../config/db");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.dashboard = function (req, res) {
  res.send("dashboard");
};
