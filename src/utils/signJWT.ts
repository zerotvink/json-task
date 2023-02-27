import { config } from "configuration";
import { v4 as uuidv4 } from "uuid";
import { sign } from "jsonwebtoken";

function signJWT() {
  return sign(
    {
      uniqueSessionId: uuidv4(),
    },
    config.jwt.tokenSecret,
    {
      expiresIn: config.jwt.expiresIn,
    },
  );
}

export { signJWT };
