import mongoose, { Document } from "mongoose";
export interface UserInput {
  email:string,
  password:string,
}

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    minLength: 3,
    maxLength: 100,
    required: true,
    unique: true,
  },
  password: { type: String, minLength: 6, maxLength: 100, required: true },
}, {
  timestamps: true,
});

export default mongoose.model("User", userSchema);