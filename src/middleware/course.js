import jwt from "../utils/jwt.js";

import User from "../models/User.js";

import config from "../config/config.js";



export const allowRoles =
  (...roles) =>
  (req, res, next) => {
    if (!req.token?.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const ok = req.token.role.some((r) => roles.includes(r));

    if (!ok) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
