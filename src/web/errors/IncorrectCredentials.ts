//credentials
import { CustomError } from "./custom.error";
export class IncorrectCredentials extends CustomError {
  statusCode = 401;
  constructor() {
    super("incorrect credentials");
    Object.setPrototypeOf(this, IncorrectCredentials.prototype);
  }
  serializeErrors() {
    return [{ message: "incorrect password or email" }];
  }
}
