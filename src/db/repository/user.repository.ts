import User, { UserInput } from "../models/user.model";
export const createUser=async (userInput:UserInput) =>{
    const user = new User({
       ...userInput
      });
      return await user.save();
}
export const getUser=async (email:string) =>{
    return await User.findOne({ email: email }); 
}