import { CustomError } from "./custom.error";
export class UnauthorizedAccess extends CustomError {
  statusCode = 403;
  constructor() {
    super("unauthorized");
    Object.setPrototypeOf(this, UnauthorizedAccess.prototype);
  }
  serializeErrors() {
    return [{ message: "Unauthorzed:Access denied" }];
  }
}
