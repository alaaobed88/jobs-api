const httpStatusCodes = require("http-status-codes");
const ErrorHandlerMiddleware = async (err, req, res) => {
  if (err instanceof CustomError)
    return res.status(err.statusCode).json({ msg: err.msg });
  return res
    .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "internal server error" });
};

module.exports = ErrorHandlerMiddleware;
