import prisma from "../../../prisma/index";
import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import bcrypt from "bcrypt";
const post: Interfaces.Controllers.Async = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;
    const hashed = (await bcrypt.hash(password, 10)).toString();
    const user = await prisma.user.create({
      data: {
        email: email,
        phoneNumber: phoneNumber,
        password: hashed,
      },
    });
    return res.json(Utils.Response.success("User created successfully"));
  } catch (err) {
    return res.json(Utils.Response.error("Error"));
  }
};

export { post };
