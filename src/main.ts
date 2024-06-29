import config from "./config/env.config";
import InitDB from "./repository/init";
import createServer from "./web/server";
import mongoose from "mongoose";
import log from "./common/logger";
const port = config.PORT;
const app = createServer();

const server = app.listen(port, async () => {
  await InitDB();
  log.info(`running at http://localhost:${port}`);
});
process.on("SIGTERM", () => {
  log.info("SIGTERM signal received.");
  server.close(async () => {
    try {
      await mongoose.disconnect();
      process.exit(0);
    } catch (err) {
      log.error(err);
      process.exit(1);
    }
  });
});
