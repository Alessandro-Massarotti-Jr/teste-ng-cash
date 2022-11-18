import express from "express"
import { AuthController } from "../controllers/AuthController";


export const authRoutes = express.Router();


authRoutes.get("/logout", AuthController.logout);
authRoutes.post("/login", AuthController.login);
