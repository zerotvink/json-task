import express, { Request, Response, RequestHandler } from "express";
import { ApplicationError } from "types/ApplicationError";
import { RequestFn } from "types/FunctionType";
import { HTTPStatuses } from "types/HttpStatus";
import { DataApplicationError } from "../../types/DataApplicationError";

abstract class BaseRouter<IController> {
  protected _controller: IController;
  protected _router = express.Router();

  constructor(controller: IController) {
    this._controller = controller;
  }

  private failable(f: RequestFn) {
    return async function (req: Request, res: Response) {
      try {
        await f(req, res);
      } catch (error) {
        if (error instanceof ApplicationError || error instanceof DataApplicationError) {
          return res.status(error.status).json({
            error: error.message,
            data: (error as DataApplicationError).data ?? {},
          });
        } else if (JSON.stringify(error) === "{}") {
          return res.status((error as ApplicationError).status ?? HTTPStatuses.INTERNAL).json({
            error: (error as ApplicationError).message,
            data: (error as DataApplicationError).data ?? {},
          });
        } else {
          return res.status(HTTPStatuses.INTERNAL).json({ error: (error as Error).message, data: {} });
        }
      }
    };
  }

  protected RegisterGetRoute(path: string, handler: RequestFn, ...middleware: RequestHandler[]) {
    if (middleware) {
      this._router.get(
        path,
        middleware.map((x) => x),
        this.failable(handler),
      );
    }

    this._router.get(path, this.failable(handler));
  }

  protected RegisterPostRoute(path: string, handler: RequestFn, ...middleware: RequestHandler[]) {
    if (middleware) {
      this._router.post(
        path,
        middleware.map((x) => x),
        this.failable(handler),
      );
    }

    this._router.post(path, this.failable(handler));
  }

  protected RegisterPutRoute(path: string, handler: RequestFn, ...middleware: RequestHandler[]) {
    if (middleware) {
      this._router.put(
        path,
        middleware.map((x) => x),
        this.failable(handler),
      );
    }

    this._router.put(path, this.failable(handler));
  }

  protected RegisterDeleteRoute(path: string, handler: RequestFn, ...middleware: RequestHandler[]) {
    if (middleware) {
      this._router.delete(
        path,
        middleware.map((x) => x),
        this.failable(handler),
      );
    }

    this._router.delete(path, this.failable(handler));
  }
}

export { BaseRouter };
