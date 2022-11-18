import { UserInterface } from "../models/UserModel";

export class AuthRequest {
    public static validateLogin(loginData: UserInterface) {
        if (!loginData.username) {
            return { error: true, message: "Nome do usuario é necessario", developerMessage: "username is required", data: null, statusHTTP: 400 }
        }
        if (!loginData.password) {
            return { error: true, message: "Senha é necessario", developerMessage: "password is required", data: null, statusHTTP: 400 }
        }

        return { error: false, message: "Dados validados", developerMessage: "validated", data: null, statusHTTP: 200 }
    }
}