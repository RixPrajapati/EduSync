import jwt from "../utils/jwt.js";
export const verifyToken = async (req, res, next) => {
  const token =
    req?.cookies["token"] || req?.headers.authorization?.split("Bearer")[1];

  if (!token) return res.status(401).json({ message: "Please log in first" });

  const verify = jwt.jwtVerify(token);
  req.token = verify;
  if (!verify) {
    throw new Error("User not Authorized");
  }
  next();
};
