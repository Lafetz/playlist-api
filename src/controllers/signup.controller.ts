import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../middleware/validateRequest";
import bcrypt from "bcryptjs";
import { createUser } from "../db/repository/user.repository";
import validateAcccount from "../middleware/validateAccoutn";
const signup= [
...validateAcccount,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    const salt=await bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    await createUser({email:req.body.email,password:hashedPassword})
    res.status(201).json({ msg: "account Created" });
    } catch (err) {
      next(err);
    }
  },
];

export default signup;