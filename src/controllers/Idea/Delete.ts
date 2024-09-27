import * as Interfaces from "../../interfaces";
import prisma from "../../../prisma/index";
import * as utils from "../../utils/index";

const Delete: Interfaces.Controllers.Async = async (req, res) => {
  try {
    const del = await prisma.idea.delete({
      where: {
        id: req.params.id,
      },
    });
    if (del) {
      res.status(200).send("Idea successfully deleted");
    }
  } catch (err: any) {
    utils.Response.error(err.message);
  }
};

export default Delete;
