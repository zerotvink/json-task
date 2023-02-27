import { RegExpChecker, REGEX } from "configuration/Regex";
import { Query } from "core/Service/Service.types";
import { ApplicationError } from "types/ApplicationError";
import { HTTPStatuses } from "types/HttpStatus";

class Pipe {
  public validate(query: Query): void {
    const value = query.name;
    const split = value.split(",");

    split.map((x: string) => {
      if (!RegExpChecker.checkInsensitive(x, REGEX)) {
        throw new ApplicationError("Invalid json format", HTTPStatuses.BAD_REQUEST);
      }
    });
  }

  public transformation(query: Query): string[] {
    const value = query.name;

    const toArray = value
      .replace(/[\[\]']/g, "")
      .replace(/\,\s/g, ",")
      .split(",");

    const unique = [...new Set(toArray)];
    return unique;
  }
}

export default Pipe;
