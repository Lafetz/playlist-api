import { NextFunction, Request, Response } from "express";
import { UnauthorizedAccess } from "../errors/unauthorized.error";
export function requireUser(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (!req.user) {
    throw new UnauthorizedAccess()
  }
  return next();
}