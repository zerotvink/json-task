import { Request, Response } from "express";
import { BaseRouter } from "routers/abstract/BaseRouter";
import { IController, Controller } from "controllers/Controller";
import { jwtMiddleware } from "middlewares/JWTMiddleware";
import { HTTPStatuses } from "types/HttpStatus";

class Router extends BaseRouter<IController> {
  constructor() {
    super(new Controller());
    this.execute();
  }

  private execute(): void {
    this.RegisterPostRoute("/set", this.set.bind(this));
    this.RegisterGetRoute("/get", this.get.bind(this), jwtMiddleware);
    this.RegisterGetRoute("/jwt", this.generateJWT.bind(this));
  }

  private async set(req: Request, res: Response): Promise<Response> {
    const response = this._controller.set(req.body);

    return res.status(HTTPStatuses.SUCCESS).json(response);
  }

  private async get(req: Request, res: Response): Promise<Response> {
    const response = this._controller.get();
    return res.status(HTTPStatuses.SUCCESS).json(response);
  }

  private async generateJWT(req: Request, res: Response): Promise<Response> {
    const response = this._controller.generateJWT();
    return res.status(HTTPStatuses.SUCCESS).json(response);
  }
}

export default Router;
