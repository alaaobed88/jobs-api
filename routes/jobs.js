const express = require("express");
const router = express.Router();
const getAllJobs = require("../controllers/jobs");
const authMiddleware = require("../middleware/authentication");

router.get("/", authMiddleware, getAllJobs);

module.exports = router;
