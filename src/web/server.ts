import express from "express";
import cors from "cors";
import healthcheck from "./routes/health.route";
import songs from "./routes/song.route"
import playlist from "./routes/playlist.route"
import user from "./routes/user.route"
import { errorHandler } from "./middleware/errorsHandler";
import deserializeUser from "./middleware/deserializeUser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import options from "./utils/swagger";


function createServer() {
  const app = express();
  cors({
    origin: "*",
})

const specs = swaggerJSDoc(options);
app.use(express.json());
app.use(deserializeUser)
app.use("/healthcheck",healthcheck);
app.use("/api",user)
app.use("/api/playlists",playlist)
app.use("/api/songs",songs)
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(errorHandler);
return app;
}

export default createServer;