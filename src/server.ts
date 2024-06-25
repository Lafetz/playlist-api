import express from "express";

import cors from "cors";
import router from "./routes/routes";
import { errorHandler } from "./middleware/errorsHandler";
import deserializeUser from "./middleware/deserializeUser";



function createServer() {
  const app = express();

  cors({
    origin: "*",
})


app.use(express.json());
app.use(deserializeUser)
app.use("/api",router);
app.use(errorHandler);
return app;
}

export default createServer;