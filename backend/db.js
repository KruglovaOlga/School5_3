const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

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
const teacher = require("./routes/teacher.routes");
const user = require("./routes/user.routes");
const schedule = require("./routes/schedule.routes");

//routes
app.use("/api/student", student);
app.use("/api/teacher", teacher);
app.use("/api/user", user);
app.use("/api/schedule", schedule);

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument.options)
);

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection closed due to app termination");
    process.exit(0);
  });
});
