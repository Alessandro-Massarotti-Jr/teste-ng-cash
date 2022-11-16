import { Request, Response } from "express";
import { TransactionInterface } from "../models/TransactionModel";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { UserRepository } from "../repositories/UserRepository";
import { ReturnAPI } from "../resources/ReturnApi";
import { CashOutService } from "../services/CashOutService";

export class TransactionController {
    public static async cashOut(req: Request, res: Response) {
        req.AuthUser
        const cashinUser = await UserRepository.findbyUsername(req.body.cashInUser);

        if (!cashinUser) {
            return ReturnAPI.messageReturn(res,{error:true,message:"usuario não encontrado",developerMessage:"user not found",data:null,statusHTTP:400})
        }
        if (cashinUser.id == req.AuthUser?.id) {
            return ReturnAPI.messageReturn(res,{error:true,message:"Não é possivel enviar um transação para si mesmo",developerMessage:"con not make a transaction with yourself",data:null,statusHTTP:400})
        }
        
        const transactionData: Omit<TransactionInterface, 'id'> = {
            value: req.body.value,
            credited_account_id: cashinUser.id,
            debited_account_id: req.AuthUser?.account_id as string
        }

        const cashOutResponse = await CashOutService.execute(transactionData);

        return ReturnAPI.messageReturn(res,cashOutResponse);
    }
}