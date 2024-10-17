import * as Interfaces from "../../interfaces";
import prisma from "../../../prisma/index";
import * as utils from "../../utils/index";

const ReadAll: Interfaces.Controllers.Async = async (_req, res) => {
  try {
    const data = await prisma.idea.findMany();
    if (data) {
      res.status(200).send(data);
    }
  } catch (err: any) {
    utils.Response.error(err.message);
  }
};

export default ReadAll;
