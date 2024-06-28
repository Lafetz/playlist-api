import dotenv from "dotenv";

dotenv.config();

const { PORT } = process.env;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? (process.env.TEST_MONGODB_URI as string)
    : (process.env.MONGODB_URI as string);
const JWT_KEY =
  process.env.NODE_ENV === "test"
    ? "test_key"
    : (process.env.JWT_KEY as string);
if (!PORT) {
  console.error("Invalid or missing environment variable: PORT");
  process.exit(1);
}

if (!MONGODB_URI) {
  console.error("Missing environment variable: MONGODB_URI");
  process.exit(1);
}
if (!JWT_KEY) {
  console.error("Missing environment variable: JWT_KEY");
  process.exit(1);
}

const config = {
  PORT,
  MONGODB_URI,
  JWT_KEY
};

export default config;
