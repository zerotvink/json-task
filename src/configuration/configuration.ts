import { ApplicationConfig } from "configuration/configuration.types";
import { routerPaths } from "configuration/libs/RouterPaths";
import { config as dotenvConfig } from "dotenv";
import cors from "cors";

dotenvConfig({
  debug: true,
  override: true,
});

const config: ApplicationConfig = {
  port: process.env.EXPRESS_APP_PORT as unknown as number,
  jwt: {
    expiresIn: process.env.EXPRESS_APP_EXPIRES_IN as string,
    tokenSecret: process.env.EXPRESS_APP_TOKEN_SECRET as string,
  },
  routers: routerPaths(),
  middlewares: [cors()],
};

export { config };
