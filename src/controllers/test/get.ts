import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

const get: Interfaces.Controllers.Sync = (req, res, next) => {
  return res.json(Utils.Response.success("Hello from test"));
};

export { get };
