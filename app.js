require("express-async-errors");
require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./db/connect");

const app = express();

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const authRoute = require("./routes/auth");
const jobsRoute = require("./routes/jobs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", jobsRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log("server up and listening on port 5000");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
