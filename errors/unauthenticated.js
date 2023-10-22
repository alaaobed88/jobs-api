const statusCodes = require("http-status-codes");
const CustomError = require("./custom-error");

class UnauthenticatedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.UNAUTHENTICATED;
  }
}
module.exports = UnauthenticatedError;
