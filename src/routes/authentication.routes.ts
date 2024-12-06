import express from "express"
import { authenticationController } from "../controllers/authentication.controller"

const router = express.Router()

//! authentication routes
router.post('/auth/register',authenticationController.register)


export default router
