const httpStatusCodes = require("http-status-codes");
const notFoundMiddleware = async (req, res) => {
  res.status(httpStatusCodes.NOT_FOUND).json({ msg: "not found" });
};

module.exports = notFoundMiddleware;
