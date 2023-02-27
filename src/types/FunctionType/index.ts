import { Request, Response, NextFunction } from "express";

export type RequestFn = (req: Request, res: Response, next?: NextFunction) => Promise<any>;
