import mongoose from "mongoose";
import  config from "../config/env.config"


async function InitDB() {
  const dbUrl = config.MONGODB_URI;
  try {
    await mongoose.connect(dbUrl);
    console.log("db connected...");
  } catch (error) {
    console.error("error trying to InitDB to db");
    process.exit(1);
  }
}

export default InitDB;