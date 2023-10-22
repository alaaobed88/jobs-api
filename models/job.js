const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    trim: true,
  },
  organization: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: [true, "Please provide user"],
  },
});

module.exports = mongoose.model("jobs", jobSchema);
