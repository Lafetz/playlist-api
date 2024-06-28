import { CreateUser } from "../../core/use-cases/user";
import User from "../models/user.model";
export const createUser=async (userData :CreateUser) =>{
    const user= new User({
     ...userData 
      });
      return await user.save();
}
export const getUser=async (email:string) =>{
    return await User.findOne({ email: email }); 
}