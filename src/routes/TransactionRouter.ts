import express from "express"
import { AccountController } from "../controllers/AccountController";


export const transactionRoutes = express.Router();


transactionRoutes.get("/",  AccountController.currentUserAccount);

