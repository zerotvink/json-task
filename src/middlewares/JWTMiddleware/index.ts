import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "types/ApplicationError";
import { HTTPStatuses } from "types/HttpStatus";
import { config } from "configuration";

async function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new ApplicationError("Unauthorized", HTTPStatuses.UNAUTHORIZED);
    }

    verify(token, config.jwt.tokenSecret, (err: any, token: any) => {
      if (err) throw new ApplicationError("Internal server error", HTTPStatuses.INTERNAL);
      req.body.token = token;
      next();
    });
  } catch (e: any) {
    res.status(e.status).json(e.message);
  }
}

export { jwtMiddleware };
