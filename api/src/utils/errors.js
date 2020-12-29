class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    switch (this.constructor) {
      case BadRequest:
        return 400;
        break;
      case Unauthorized:
        return 401;
        break;
      case Forbidden:
        return 403;
        break;
      case NotFound:
        return 404;
        break;
      case UnprocessableEntity:
        return 422;
        break;
      default:
        return 500;
    }
  }
}

class BadRequest extends GeneralError { };
class NotFound extends GeneralError { };
class Unauthorized extends GeneralError { };
class Forbidden extends GeneralError { };
class UnprocessableEntity extends GeneralError { };

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  Unauthorized,
  Forbidden,
  UnprocessableEntity
};
