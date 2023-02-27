import { IController } from "controllers/Controller/Controller.interfaces";
import { IService, Service } from "core/Service";
import { Query } from "core/Service/Service.types";
import Pipe from "./Pipe";

class Controller implements IController {
  private readonly _service: IService = new Service();
  private readonly _pipe = new Pipe();

  public set(query: Query): string[] {
    this._pipe.validate(query);
    const transformation = this._pipe.transformation(query);
    return this._service.set(transformation);
  }

  public get(): string[][] {
    return this._service.get();
  }

  public generateJWT(): string {
    return this._service.generateJWT();
  }
}

export { Controller };
