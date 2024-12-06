import express from "express";
import { authenticationController } from "../controllers/authentication.controller";
import { userController } from "../controllers/user.controller";

const router = express.Router();

//! authentication routes
router.post("/auth/register", authenticationController.register);
router.post("/auth/login", authenticationController.login);
router.get("/users",userController.getUsers)

export default router;
