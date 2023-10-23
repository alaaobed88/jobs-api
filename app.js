//packages
require("express-async-errors");
require("dotenv").config();

//error handlers
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

//routes
const authRoute = require("./routes/auth");
const jobsRoute = require("./routes/jobs");

//middlewares
const authMiddleware = require("./middleware/authentication");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const ratelimiter = require("express-rate-limit");

const express = require("express");
const connectToDatabase = require("./db/connect");

const app = express();

app.set("trust proxy", 1);
app.use(ratelimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", authMiddleware, jobsRoute);

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
