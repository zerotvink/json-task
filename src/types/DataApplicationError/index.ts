import { ApplicationError } from "../ApplicationError";
import { HTTPStatuses } from "../HttpStatus";

class DataApplicationError extends ApplicationError {
  public data: any;
  constructor(data: any, message: string, status: HTTPStatuses = HTTPStatuses.INTERNAL) {
    super(message, status);
    this.data = data;
  }
}

export { DataApplicationError };
