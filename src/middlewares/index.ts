import { NextFunction, Request, Response } from "express";
import { get, identity, merge } from "lodash";
import { UserModel } from "../models/user";

export const isAuthenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // find there is any cookies is present or not
    const sessionToken = req.cookies["rest-api-sessions"];
    if (!sessionToken) {
      res.status(403).json({
        message: "unauthorized access. please login first to access data`",
      });
      return;
    }
    const existingUser = await UserModel.findOne({
      "authentication.sessionToken": sessionToken,
    });
    console.log(existingUser);
    if (!existingUser) {
      res.status(403).json({
        message: "unauthorized access",
      });
      return;
    }
    // merge(req, { identity: existingUser });
    next();
  } catch (err) {
    console.log(err);
  }
};
