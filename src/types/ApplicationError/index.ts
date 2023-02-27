import { HTTPStatuses } from "types/HttpStatus";

class ApplicationError extends Error {
  public status: number = HTTPStatuses.INTERNAL;

  constructor(message: string, status = HTTPStatuses.INTERNAL) {
    super(message);
    this.status = status;
  }
}

export { ApplicationError };
