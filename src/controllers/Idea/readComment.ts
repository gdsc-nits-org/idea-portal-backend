import * as Interfaces from "../../interfaces";
import prisma from "../../../prisma/index";
import * as utils from "../../utils/index";

const ReadComments: Interfaces.Controllers.Async = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        ideaId: req.params.id,
      },
      orderBy: { createdAt: "desc" },
    });

    if (comments) {
      res.status(200).send(comments);
    }
  } catch (err: any) {
    utils.Response.error(err.message);
  }
};

export default ReadComments;
