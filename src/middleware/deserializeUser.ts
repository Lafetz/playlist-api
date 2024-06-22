import { NextFunction, Request, Response } from "express";
import { UnauthorizedAccess } from "../errors/unauthorized.error";
import { verifyJWT } from "../util/jwt";


function deserializeUser(req: Request, res: Response, next: NextFunction) {
 const authHeader = req.headers['Authorization']
 if (!authHeader||typeof authHeader !== 'string'){
    return next();
 }
 const token = authHeader.split(' ')[1]
 if (token == null){
    return next();
 }
if (!token) {
    return next();
  }

  const { payload, expired } = verifyJWT(token);
  if (payload) {
    // @ts-ignore
    req.user = payload;
    return next();
  }


  return next();
}

export default deserializeUser;