import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT;
export const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN!;
