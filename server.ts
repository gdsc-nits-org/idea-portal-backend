import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import * as Middlewares from "./src/middlewares";
import * as Routers from "./src/routers";
import * as Constants from "./src/globals/constants";
import * as Controllers from "./src/controllers/index";

const app = express();

// Middlewares
app
  .use(cors())
  .use(helmet())
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// Routers
app.use(`${Constants.System.ROOT}/`, Routers.Health);
app.post('/idea/add',Controllers.Idea.Create);
app.get('/idea/read/:user',Controllers.Idea.Read);
app.patch('/idea/update/:id',Controllers.Idea.Update);
app.delete('/idea/delete/:id',Controllers.Idea.Delete);
// Error Handlers
app.use(Middlewares.Error.errorHandler);
app.listen(Constants.System.PORT, () => {
  console.log(`Server started on port ${Constants.System.PORT}`);
});
