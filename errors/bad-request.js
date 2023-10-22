const statusCodes = require("http-status-codes");
const CustomError = require("./custom-error");

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}
module.exports = BadRequestError;
