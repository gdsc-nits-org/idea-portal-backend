import * as Interfaces from "../../interfaces";
import prisma from "../../../prisma/index";
import * as Utils from "../../utils";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { JWT_SECRET_TOKEN } from "prisma/secrets";
const get: Interfaces.Controllers.Async = async (req, res) => {
  try {
    dotenv.config();
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.json(Utils.Response.error("User not found"));
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      const jwtSecret = JWT_SECRET_TOKEN;

      // if (!jwtSecret) {
      //     throw new Error("JWT_SECRET_TOKEN is not defined in environment variables.");
      // }

      // if (!user || !user.id || !user.email) {
      //     throw new Error("Invalid user data.");
      // }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        jwtSecret,
        { expiresIn: "72000h" }
      );
      return res.json(Utils.Response.success(token));
    } else {
      return res.json(Utils.Response.error("Incorrect password"));
    }
  } catch (err) {
    return res.json(Utils.Response.error("Error in logging in"));
  }
};

export { get };
