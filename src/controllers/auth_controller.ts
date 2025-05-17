import { Response } from "express";
import { User } from "../models/user_model";
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

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(200).json({
        status: false,
        message: "User already exists",
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
        status: false,
        message: "Failed to create user because of token not created.",
      });
    }

    return res.status(201).json({
      status: true,
      message: "Welcome to a new World",
      token: token,
      data: newUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const signInUser = async (req: any, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(200).json({
        status: false,
        message: "User not found with this email",
      });
    }

    const isPasswordMatched = await bcryptjs.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(200).json({
        status: false,
        message: "Incorrect Password",
      });
    }

    const token = await generateToken({
      id: user.id,
    });

    return res.status(200).json({
      status: true,
      message: "Welcome to Assesment App",
      token: token,
      data: user,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
