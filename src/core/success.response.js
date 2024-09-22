  const { ReasonPhrases, StatusCodes } = require("../utils/httpStatusCode");

  class SuccessResponse {
    constructor({
      message,
      reasonStatus = ReasonPhrases.OK,
      statusCode = StatusCodes.OK,
      metadata = {},
    }) {
      this.message = !message ? reasonStatus : message;
      this.status = statusCode;
      this.metadata = metadata;
    }

    send(res, headers = {}) {
      return res.status(this.status).json(this);
    }
  }

  module.exports = { SuccessResponse };
