import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../validator/validateRequest";
import bcrypt from "bcryptjs";
import validateAcccount from "../validator/validateAccount";
import { createUser } from "../../core/services/user.service";
const signup = [
  ...validateAcccount,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      const user = await createUser({
        email: req.body.email,
        password: hashedPassword
      });
      res.status(201).json({ msg: "account Created" });
    } catch (err) {
      next(err);
    }
  }
];

export default signup;
