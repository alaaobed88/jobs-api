const UnauthorizedError = require("../errors/unauthenticated");
const BadRequestError = require("../errors/bad-request");
const httpStatusCodes = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new UnauthorizedError("Unauthorized");
  }
  const token = auth.split(" ")[1];

  const payload = jwt.decode(token, "asdasdasdasd");

  const { name, userId } = payload;
  console.log({ name, userId });
  const user = await User.findById({ _id: userId });
  console.log(user);
  if (!user) {
    throw new UnauthorizedError("Unauthorized");
  }
  next(userId);
};

module.exports = authMiddleware;
