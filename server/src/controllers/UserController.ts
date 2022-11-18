import { Request, Response } from "express";
import { UserInterface } from "../models/UserModel";
import { UserRepository } from "../repositories/UserRepository";
import { UserRequest } from "../requests/UserRequest";
import { ReturnAPI } from "../resources/ReturnApi";
import { SignupService } from "../services/SignupService";

export class UserController {

    public static async index(req: Request, res: Response) {
        const users = await UserRepository.findAll();
        return ReturnAPI.messageReturn(res, { error: false, developerMessage: 'Authenticated user', message: 'usuario logado no sistema', data: users, statusHTTP: 200 })
    }

    public static auth(req: Request, res: Response) {
        return ReturnAPI.messageReturn(res, { error: false, developerMessage: '', message: 'teste', data: req.AuthUser || null, statusHTTP: 200 })
    }


    public static async store(req: Request, res: Response) {

        const data = req.body as Omit<UserInterface,'id'>

        const validate_data = UserRequest.validateStore(data);

        if(validate_data.error){
            return ReturnAPI.messageReturn(res, validate_data)
        }

        const signupResponse = await SignupService.execute(data);

        return ReturnAPI.messageReturn(res, signupResponse)
    }
}