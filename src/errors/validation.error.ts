import { FieldValidationError, ValidationError } from "express-validator";
import { CustomError } from "./custom.error";

export class RequestValidationError extends CustomError {
  statusCode = 403;
  errors;
  constructor(errors: FieldValidationError[]) {
    super("Invalid request parameters");
    this.errors = errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.path };
    });
  }
}