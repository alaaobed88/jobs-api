const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: [true, "email exists"],
    maxlength: 48,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("users", userSchema);
