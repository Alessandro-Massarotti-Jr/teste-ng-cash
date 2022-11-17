import { Request, Response } from "express";
import { TransactionInterface, TransactionModel, TransactionVisibleData } from "../models/TransactionModel";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { UserRepository } from "../repositories/UserRepository";
import { ReturnAPI } from "../resources/ReturnApi";
import { CashOutService } from "../services/CashOutService";
import moment from "moment";

interface WhereInterface {
    createdAt: {
        gte: Date;
        lte: Date;
    },
    debited_account_id?: string;
    credited_account_id?: string;
}

export class TransactionController {
    public static async cashOut(req: Request, res: Response) {
        req.AuthUser
        const cashinUser = await UserRepository.findbyUsername(req.body.cashInUser);

        if (!cashinUser) {
            return ReturnAPI.messageReturn(res, { error: true, message: "usuario não encontrado", developerMessage: "user not found", data: null, statusHTTP: 400 })
        }
        if (cashinUser.id == req.AuthUser?.id) {
            return ReturnAPI.messageReturn(res, { error: true, message: "Não é possivel enviar um transação para si mesmo", developerMessage: "con not make a transaction with yourself", data: null, statusHTTP: 400 })
        }

        const transactionData: Omit<TransactionInterface, 'id'> = {
            value: req.body.value,
            credited_account_id: cashinUser.account_id as string,
            debited_account_id: req.AuthUser?.account_id as string
        }

        const cashOutResponse = await CashOutService.execute(transactionData);

        return ReturnAPI.messageReturn(res, cashOutResponse);
    }

    public static async index(req: Request, res: Response) {
        const trasactions = await TransactionRepository.findAll();
        return ReturnAPI.messageReturn(res, { error: false, message: "transactions", developerMessage: "all transactions", data: trasactions, statusHTTP: 200 })
    }

    public static async getTransactions(req: Request, res: Response) {

        const date = {
            start: moment().subtract(1,'M').toDate(),
            end: moment().toDate()
        }

        if (req.body.date_start) {
            date.start = moment(req.body.date_start).toDate()
        }

        if (req.body.date_end) {
            date.end = moment(req.body.date_end).toDate()
        }

        const where: WhereInterface = {
            createdAt: {
                gte: date.start,
                lte: date.end
            }
        }

        if(req.body.cashIn && !req.body.cashOut){
            where.credited_account_id = req.AuthUser?.account_id;
        }else if(req.body.cashOut && !req.body.cashIn){
            where.debited_account_id = req.AuthUser?.account_id
        }

        const transactions = await TransactionModel.findMany({
            where: where,
            select: TransactionVisibleData
        });

        return ReturnAPI.messageReturn(res, { error: false, message: "transactions", developerMessage: "all transactions", data: transactions, statusHTTP: 200 })
    }

}