import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const getToken = (userId: any): string => {
  if (!process.env.JWT_SECRET_TOKEN) {
    throw new Error("JWT_SECRET_TOKEN environment variable is not defined.");
  }
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: "1 day",
  });
};
export default getToken;
