import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import validateAcccount from "../validator/validateAccount";

import { validateRequest } from "../validator/validateRequest";
import { signJWT } from "../utils/jwt";
import { IncorrectCredentials } from "../errors/IncorrectCredentials";
import { getUser } from "../../core/services/user.service";
const signin = [
  ...validateAcccount,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUser(req.body.email);

      if (user) {
        const statusLogin = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!statusLogin) {
          throw new IncorrectCredentials();
        }
        const userInfo = { id: user._id };
        const jwt = signJWT(userInfo, "3d");
        res.status(200).json({ token: jwt });
      } else {
        throw new IncorrectCredentials();
      }
    } catch (err) {
      next(err);
    }
  }
];
export default signin;
