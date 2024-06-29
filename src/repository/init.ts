import mongoose from "mongoose";
import config from "../config/env.config";
import log from "../common/logger";

async function InitDB() {
  const dbUrl = config.MONGODB_URI;
  try {
    await mongoose.connect(dbUrl);
    log.info("db connected...");
  } catch (error) {
    log.error("error trying to connect to db");
    process.exit(1);
  }
}

export default InitDB;
