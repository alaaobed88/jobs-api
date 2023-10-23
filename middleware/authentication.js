const UnauthorizedError = require("../errors/unauthenticated");
const BadRequestError = require("../errors/bad-request");
const httpStatusCodes = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new UnauthorizedError("Unauthorized");
  }
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const { name, userId } = payload;
    req.user = { userId, name };
    next();
  } catch (err) {
    throw new UnauthorizedError("Unauthorized");
  }
};

module.exports = authMiddleware;
