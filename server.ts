import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Server } from "socket.io";
import { commentSocket } from "src/sockets/socket";

import * as Middlewares from "./src/middlewares";
import * as Routers from "./src/routers";
import * as Constants from "./src/globals/constants";
import * as Controllers from "./src/controllers/index";
import { CorsOptions } from "cors";

const app = express();
interface MyCorsOptions extends CorsOptions {
  origin: string[] | boolean;
}
const corsOptions: MyCorsOptions = {
  origin: true,
};
const server = app.listen(Constants.System.PORT, () => {
  console.log(`Server started on port ${Constants.System.PORT}`);
});

app.use(cors(corsOptions));
const io = new Server(server, {
  cors: corsOptions,
});

app
  .use(helmet())
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// Routers
app.use(`${Constants.System.ROOT}/`, Routers.Health);
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

commentSocket(io);

app.post("/idea/add", Controllers.Idea.Create);
app.get("/idea/read", Controllers.Idea.ReadAll);
app.get("/idea/read/:user", Controllers.Idea.Read);
app.patch("/idea/update/:id", Controllers.Idea.Update);
app.delete("/idea/delete/:id", Controllers.Idea.Delete);
app.use(Middlewares.Error.errorHandler);

app.get("/:id/comment", Controllers.Idea.ReadComments);
app.post("/comment/add", Controllers.Idea.AddComment);
app.delete("/comment/delete/:id", Controllers.Idea.DeleteComment);
