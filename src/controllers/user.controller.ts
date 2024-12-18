import { Request, Response } from "express";
import { UserModel } from "../models/user";

// get all users from db
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json({ success: true, users }).status(200);
    return;
  } catch (err) {
    console.log(err);
  }
};

// get users by email
const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userData = await UserModel.find({ email });
    return res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (err) {
    console.log(err);
  }
};

// get user by id
const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const userData = await UserModel.findById(id);
    return res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (err) {
    console.log(err);
  }
};

// create our user
const createNewUser = async (req: Request, res: Response) => {
  try {
    const { values } = req.body;
    const userData = await new UserModel(values)
      .save()
      .then((user) => user.toObject());
    return res.status(201).json({
      success: true,
      message: "user created successfully",
      data: userData,
    });
  } catch (err) {
    console.log(err);
  }
};

// delete user by id
const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // get id from the request.params
    const deleteUser = await UserModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: `${id} this user deleted successfully`,
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

// update user by id
const updateUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName } = req.body;
    const { id } = req.params;

    // find if user is present or not
    const findUser = await UserModel.findOne({ _id: id });

    if (!findUser) {
      res.status(400).json({
        success: false,
        message: "user not found",
      });
      return;
    }
    // update user name
    findUser.userName = userName;
    const updatedUser = await findUser.save();
    // send responspe
    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: updatedUser,
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

export const userController = {
  getUsers,
  getUserByEmail,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
};
