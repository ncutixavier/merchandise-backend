import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (params) => {
  const token = jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  console.log(token);
  return token;
};
