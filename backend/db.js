const express = require("express");
const app = express();
const port = 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectionString = process.env.MONGODB_URI;

async function connectToDatabase() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Mongoose connected to database");
  } catch (error) {
    console.error("Mongoose connection error:", error);
  }
}

connectToDatabase();

app.listen(port, () => {
  console.log(`Server is listening in port ${port}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

const student = require("./routes/student.routes");
app.use("/api/student", student);

const teacher = require("./routes/teacher.routes");
app.use("/api/teacher", teacher);

const user = require("./routes/user.routes");
app.use("/api/user", user);

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed due to app termination");
    process.exit(0);
  });
});
