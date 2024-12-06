import { Request, Response } from "express";
import { authentication, random } from "helpers";
import { UserModel } from "models/user";

const register = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    // check every data will be present or not
    if (!userName || !email || !password) {
      return res.sendStatus(400).json({
        message: "all fields are required!!",
      });
    }

    // now check if the user is existing or not
    const isExists = await UserModel.find({ email });
    if (isExists) {
      return res.sendStatus(400).json({
        message: "user is already exists!!",
      });
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
    return res.status(200).json({
      success: true,
      message: "user created successfully",
      data: createdUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "something went wrong!",
    });
  }
};
