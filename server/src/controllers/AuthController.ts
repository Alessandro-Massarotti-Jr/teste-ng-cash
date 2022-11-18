
import { Request, Response } from "express"
import { UserInterface } from "../models/UserModel";
import { AuthRequest } from "../requests/AuthRequest";
import { ReturnAPI } from "../resources/ReturnApi";
import { LoginService } from "../services/LoginService";

export class AuthController {

    public static async login(req: Request, res: Response) {
        const loginData: UserInterface = req.body;

        const validateLoginRespose = AuthRequest.validateLogin(loginData);

        if (validateLoginRespose.error) {
            return ReturnAPI.messageReturn(res, validateLoginRespose)
        }

        const loginResult = await LoginService.execute(loginData);
        res.cookie('access_token', loginResult.data?.token, { httpOnly: true, maxAge: 8640000, })
        return ReturnAPI.messageReturn(res, loginResult);
    }

    public static async logout(req: Request, res: Response) {
        res.cookie('access_token', '', { maxAge: 1 });
        return ReturnAPI.messageReturn(res, { error: false, message: "logout realizado com sucesso", developerMessage: "user logout", data: null, statusHTTP: 200 });
    }


}