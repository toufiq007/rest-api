import { Request, Response } from "express";
import { authentication, random } from "../helpers/index";
import { UserModel } from "../models/user";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, email, password } = req.body;

    // console.log(userName,email,password)

    // check every data will be present or not
    if (!userName || !email || !password) {
      res.status(400).json({
        message: "all fields are required!!",
      });
      return;
    }

    // now check if the user is existing or not
    const isExists = await UserModel.findOne({ email }); // userModel.findOne not userModel.find --> because findOne give one specific element and find gives a array of element
    console.log(isExists);
    if (isExists) {
      res.status(400).json({
        message: "user is already exists!!",
      });
      return;
    }

    // create salt
    const salt = random();
    const values = {
      userName,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    };
    const user = new UserModel(values);
    const createdUser = await user.save().then((user) => user.toObject());
    console.log(createdUser, "this is the new created user");

    // response back update created user
    res.status(200).json({
      success: true,
      message: "user created successfully",
      data: createdUser,
    });
    return;
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "something went wrong!",
    });
    return;
  }
};

export const authenticationController = {
  register,
};
