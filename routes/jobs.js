const express = require("express");
const router = express.Router();
const {
  getJobsCreatedByUser,
  postJob,
  getJob,
  deleteJob,
  updateJob,
} = require("../controllers/jobs");

router.get("/", getJobsCreatedByUser);
router.get("/:id", getJob);
router.post("/", postJob);
router.delete("/:id", deleteJob);
router.patch("/:id", updateJob);

module.exports = router;
