import { Query } from "core/Service/Service.types";

interface IController {
  set(query: Query): string[];
  get(): string[][];
  generateJWT(): string;
}

export { IController };
