import { Request, Response, NextFunction } from "express";
import mongoose, { mongo } from "mongoose";
import { CustomError } from "../errors/custom.error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof mongo.MongoError && err.code === 11000) {
    let errors = [];
    //@ts-ignore
    for (let k in err.keyValue) {
      //@ts-ignore
      if (err.keyValue.hasOwnProperty(k)) {
        errors.push({ message: `${k} taken`, field: k });
      }
    }
    return res.status(422).send({ errors: errors });
  }
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.error(err);
  res.status(500).send({
    errors: [{ message: "Something went wrong" }],
  });
};