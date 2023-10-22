const Job = require("../models/job");

const getAllJobs = async (req, res) => {
  const { userId } = req;
  const jobs=Job.find
};

module.exports = getAllJobs;
