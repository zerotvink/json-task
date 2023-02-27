import { ROUTERS_PATH } from "constants/Paths";
import { readdirSync } from "fs";
import { join } from "path";

export function routerPaths(): string[] {
  return readdirSync(ROUTERS_PATH).map((x: string) => join(ROUTERS_PATH, x));
}
