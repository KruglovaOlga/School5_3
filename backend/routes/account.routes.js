const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user.controller");
const accountController = require("../controllers/account.controller");

router.get("/", (req, res) => {
  res.send("Main Page");
});

router.post("/reg", userController.addUser);
router.post("/auth", userController.auth);

router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  accountController.dashboard
);
module.exports = router;
