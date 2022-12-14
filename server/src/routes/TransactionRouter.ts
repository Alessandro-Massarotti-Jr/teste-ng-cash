import express from "express"
import { AccountController } from "../controllers/AccountController";
import { TransactionController } from "../controllers/TransactionController";


export const transactionRoutes = express.Router();

transactionRoutes.get("/", TransactionController.index);
transactionRoutes.post("/filter", TransactionController.getTransactions);
transactionRoutes.post("/", TransactionController.cashOut);