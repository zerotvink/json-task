import express, { Application } from "express";
import { ApplicationConfig } from "configuration";
import { HttpMiddleware } from "configuration";
import { Server as HttpServer, createServer } from "http";
import { tryToImport } from "utils/tryToImport";

class ApplicationHttpServer {
  private readonly _app: Application = express();
  private readonly _port: number;
  private readonly _httpServer: HttpServer;

  constructor(config: ApplicationConfig) {
    this._port = config.port;
    this._httpServer = createServer(this._app);

    this.middlewares(config.middlewares);
    this.routers(config.routers);
    this._app.use(express.json());
  }

  public listen(): void {
    this._httpServer.listen(this._port, () => {
      console.log(`Server is running on http://localhost:${this._port}`);
    });
  }

  private middlewares(middlewares?: HttpMiddleware[]): void {
    if (middlewares) {
      middlewares.map((middleware: HttpMiddleware) => {
        this._app.use(middleware);
      });
    }
  }

  private async routers(routers: string[]): Promise<void> {
    routers.map(async (router: string) => {
      const routerInstance = await tryToImport(router);

      if (routerInstance) {
        this._app.use("/", new routerInstance.default()._router);
      }
    });
  }
}

export { ApplicationHttpServer };
