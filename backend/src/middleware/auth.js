import jwt from "../utils/jwt.js";
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req?.headers?.authorization;
    const token = req?.cookies?.["token"] || authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "User not Authorized" });
    }

    req.token = jwt.jwtVerify(token);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
