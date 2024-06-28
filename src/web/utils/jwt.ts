import * as jwt from "jsonwebtoken";
import config from "../../config/env.config";
export function signJWT(payload: object, expiresIn: string | number) {
  return jwt.sign(payload, config.JWT_KEY, {
    expiresIn,
  });
}

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token,config.JWT_KEY);
    return { payload: decoded, expired: false };
  } catch (error: any) {
    console.error(error)
    return { payload: null, expired: true };
  }
};