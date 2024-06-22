import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import validateAcccount from "../middleware/validateAccoutn";
import { getUser } from "../db/repository/user.repository";
import { validateRequest } from "../middleware/validateRequest";
import { signJWT } from "../util/jwt";
import { IncorrectCredentials } from "../errors/IncorrectCredentials";
type userInfo={
  email:string
}
const signin = [
 ...validateAcccount,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUser( req.body.email);
    
      if (user) {
        const statusLogin = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!statusLogin) {
          throw new IncorrectCredentials();
        }
      const userInfo:userInfo={email:req.body.email}
      const jwt=signJWT(userInfo,"1d")
      res.status(200).json({token:jwt})
      } else {
        throw new IncorrectCredentials();
      }
    } catch (err) {
      next(err);
    }
  },
];
export default signin;