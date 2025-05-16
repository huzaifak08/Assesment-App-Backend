import { Response } from "express";
import { User } from "../models/user_model";

export const getUserProfileData = async (
  req: any,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.query;

    const emailRegex =
      /^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid email format",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(501).json({
        status: false,
        message: "No user found in database with provided email",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Data fetched successfully",
      data: user,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
