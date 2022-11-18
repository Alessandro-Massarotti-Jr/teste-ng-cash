import express from "express"
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { ReturnAPI } from "./resources/ReturnApi";
import { accountRoutes } from "./routes/AccountRouter";
import { authRoutes } from "./routes/AuthRouter";
import { transactionRoutes } from "./routes/TransactionRouter";
import { userRoutes } from "./routes/UserRouter";

export const routes = express.Router();

routes.get("/", async (req, res) => {
    return res.status(200).json({Running:"Ng_cash"});
});

routes.use("/users",userRoutes);
routes.use("/auth",authRoutes);
routes.use("/accounts",AuthMiddleware.Authenticate,accountRoutes);
routes.use("/transaction",AuthMiddleware.Authenticate,transactionRoutes);

routes.use((req,res)=>{
    return ReturnAPI.messageReturn(res,{error:true,developerMessage:"Route Not found",message:"Rota não encontrada",data:null,statusHTTP:404});
})