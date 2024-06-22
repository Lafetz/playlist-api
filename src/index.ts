import express,{Request,Response} from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
//@ts-ignore
import cors from "cors";
import router from "./routes/routes";
import { errorHandler } from "./middleware/errorsHandler";
import InitDB from "./db/init";

require("dotenv").config();
const port=8080
const app=express();
InitDB()
  app.use(
    cors({
        origin: "*",
    })
  );
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(router);
  app.use(errorHandler);
app.listen(port,()=>{
    console.log("server running...")
})