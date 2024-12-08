import express from "express";
import { authenticationController } from "../controllers/authentication.controller";
import { userController } from "../controllers/user.controller";
import { isAuthenticate } from "../middlewares/index";

const router = express.Router();

//! authentication routes
router.post("/auth/register", authenticationController.register);
router.post("/auth/login", authenticationController.login);
router.get("/users", isAuthenticate, userController.getUsers);
router.delete("/user/:id", userController.deleteUserById);

export default router;
