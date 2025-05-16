import { Response } from "express";
import { User } from "../models/user";
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = async (payload: any) => {
  return await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const registerUser = async (req: any, res: Response): Promise<any> => {
  try {
    const { email, password, name, profilePic } = req.body;

    if (!email || !password || !name || !profilePic) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(401).json({
        status: false,
        message: "User already exists",
      });
    }

    const emailRegex =
      /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email format",
      });
    }

    const hashPass = await bcryptjs.hash(password, 8);

    const newUser = await User.create({
      email: email,
      password: hashPass,
      name: name,
      profilePic: profilePic,
    });

    const token = await generateToken({ id: newUser.id });

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Failed to create user",
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Welcome to a new World",
      data: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
