import express from "express"
import { AccountController } from "../controllers/AccountController";


export const accountRoutes = express.Router();


accountRoutes.get("/",  AccountController.currentUserAccount);

