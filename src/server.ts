import express,{Request,Response} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/routes";
import { errorHandler } from "./middleware/errorsHandler";
import deserializeUser from "./middleware/deserializeUser";



function createServer() {
  const app = express();

  cors({
    origin: "*",
})

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(deserializeUser)
app.use("/api",router);
app.use(errorHandler);
return app;
}

export default createServer;