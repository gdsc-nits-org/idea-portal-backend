import * as Interfaces from "../../interfaces";
import prisma from "../../../prisma/index";
import * as utils from "../../utils/index";

const AddComment: Interfaces.Controllers.Async = async (req, res) => {
  try {
    const { ideaId, user, content } = req.body;
    console.log(req.body);
    const comment = await prisma.comment.create({
      data: {
        ideaId,
        user,
        content,
      },
    });

    if (comment) {
      res.status(200).json(comment);
    }
  } catch (err: any) {
    utils.Response.error(err.message);
  }
};

export default AddComment;
