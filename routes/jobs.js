const express = require("express");
const router = express.Router();
const {
  getJobsCreatedByUser,
  postJob,
  getJob,
} = require("../controllers/jobs");

router.get("/", getJobsCreatedByUser);
router.get("/:id", getJob);
router.post("/", postJob);

module.exports = router;
