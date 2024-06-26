import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT as string;
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI as string
  : process.env.MONGODB_URI as string;

if (!PORT) {
  console.log("Missing environment variable: PORT");
  process.exit(1);

}

if (!MONGODB_URI) {
  console.log("Missing environment variable: MONGODB_URI");
  process.exit(1);
}

const config = {
  PORT,
  MONGODB_URI
};

export default config;