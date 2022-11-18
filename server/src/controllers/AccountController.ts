import { Request, Response } from "express";
import { AccountRepository } from "../repositories/AccountRepository";
import { ReturnAPI } from "../resources/ReturnApi";

export class AccountController {
    public static async currentUserAccount(req: Request, res: Response) {
        if (!req.AuthUser?.account_id) {
            return ReturnAPI.messageReturn(res, { error: true, message: "conta não encontrada", developerMessage: "account not found", data: null, statusHTTP: 400 });
        }
        const user_account = await AccountRepository.find(req.AuthUser.account_id);
        return ReturnAPI.messageReturn(res, { error: false, message: "conta do usuario atual", developerMessage: "user account", data: user_account, statusHTTP: 200 })
    }
}