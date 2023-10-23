const BadRequestError = require("../errors/bad-request");
const Job = require("../models/job");
const { StatusCodes } = require("http-status-codes");

const getJobsCreatedByUser = async (req, res) => {
  const { userId, name } = req.user;
  const jobs = await Job.find({ createdBy: userId });
  res.status(StatusCodes.OK).json(jobs);
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  res.status(StatusCodes.OK).json({ job });
};

const postJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  if (
    !req.body.role ||
    !req.body.organization ||
    !req.body.description ||
    !req.body.status ||
    !req.body.createdBy
  )
    throw new BadRequestError("please provide all informations");

  const createdJob = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ createdJob });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { _id: jobId },
  } = req;

  if (!jobId) {
    throw new BadRequestError("please provide id for the job");
  }
};

const editJob = async (req, res) => {};

module.exports = { getJobsCreatedByUser, getJob, postJob };
