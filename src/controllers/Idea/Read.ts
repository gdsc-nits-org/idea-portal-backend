import * as Interfaces from "../../interfaces";
import prisma from "../../../prisma/index";
import * as utils from "../../utils/index";

const Read: Interfaces.Controllers.Async = async (req, res) => {
  try {
    const data = await prisma.idea.findMany({
      where: {
        user: req.params.user,
      },
    });
    if (data) {
      res.status(200).send(data);
    }
  } catch (err: any) {
    utils.Response.error(err.message);
  }
};

export default Read;
