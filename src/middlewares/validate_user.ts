import { Request, Response, NextFunction } from "express";
import { User } from "../models/user_model";
const jwt = require("jsonwebtoken");

const validateUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Auth-Token");

    if (!token) {
      res.status(401).json({ error: "Access denied. No token provided." });
      return;
    }

    const secretKey = process.env.JWT_SECRET_KEY!;
    const payload = jwt.verify(token, secretKey) as { id: string };

    const user = await User.findByPk(payload.id);

    if (!user) {
      res.send("User not registered");
      return;
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Server Error 500",
    });
    return;
  }
};

export default validateUser;
