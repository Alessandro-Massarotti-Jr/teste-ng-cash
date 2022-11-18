import express from "express"
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";


export const userRoutes = express.Router();


userRoutes.get("/", UserController.index);
userRoutes.get("/auth-user", AuthMiddleware.Authenticate, UserController.auth);
userRoutes.post("/", UserController.store);
