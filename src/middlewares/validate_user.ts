import { Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

interface AuthTokenPayload {
  email: string;
}
``;
const validateUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const authToken = req.header("Auth-Token");

    if (!authToken) {
      console.error("No Auth-Token provided");
      return res.status(401).send("Unauthorized: No Auth-Token provided");
    }

    let check: AuthTokenPayload;
    try {
      check = jwt.verify(
        authToken,
        process.env.JWT_AUTH_KEY!
      ) as AuthTokenPayload;
    } catch (error) {
      console.error("JWT verification failed:", error);
      return res.status(401).send("Unauthorized: Invalid Auth-Token");
    }

    if (check && check.email) {
      const profile = await User.findOne({
        where: { email: check.email, status: "onboarded" },
      });

      if (profile) {
        req.auth = {
          id: profile.id,
          email: profile.email,
        };
      } else {
        req.auth = { email: check.email };
      }
      return next();
    }

    return res.status(401).send("Unauthorized: Invalid email in token");
  } catch (err: any) {
    console.error("Middleware Authentication Error:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export default validateUser;
