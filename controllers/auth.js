const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BadRequestError = require("../errors/bad-request");
const UnauthorizedError = require("../errors/unauthenticated");
const User = require("../models/user");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all credentials");
  }
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name: name,
    email: email,
    password: encryptedPassword,
  });
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    "asdasdasdasd",
    { expiresIn: "30d" }
  );
  res.status(201).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide all credentials");
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new UnauthorizedError("Unauthorized");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new UnauthorizedError("Unauthorized");
  }

  const token = await jwt.sign(
    { userId: user._id, name: user.name },
    "asdasdasdasd",
    { expiresIn: "30d" }
  );
  res.status(201).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
