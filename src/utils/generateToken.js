import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.AUTH_SECRET, { expiresIn: "7 days" });
}

export default generateToken;