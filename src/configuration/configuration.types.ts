import { NextFunction, Request, Response } from "express";

type HttpMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

type JWTConfig = {
  expiresIn: string | number;
  tokenSecret: string;
};

type Config = {
  port: number;
  jwt: JWTConfig;
  routers: string[];
  middlewares?: HttpMiddleware[];
};

type ApplicationConfig = Readonly<Config>;

export { JWTConfig, ApplicationConfig, HttpMiddleware };
