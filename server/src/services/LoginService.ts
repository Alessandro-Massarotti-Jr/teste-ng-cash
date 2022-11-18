import bcrypt from "bcrypt"
import jwt, { Secret } from "jsonwebtoken";
import { UserInterface } from "../models/UserModel";
import { UserRepository } from "../repositories/UserRepository";

export class LoginService {
    public static async execute(loginData: UserInterface) {

        const jwt_secret = process.env.JWT_SECRET;

        const userData = await UserRepository.findbyUsername(loginData.username)

        if (!userData) {
            return { error: true, message: 'Usuario não encontrado ou inexistente', developerMessage: 'User not found', data: null, statusHTTP: 400 }
        }

        const checkPassword = await bcrypt.compare(loginData.password, userData.password);

        if (!checkPassword) {
            return { error: true, message: 'Senha invalida', developerMessage: 'invalid password', data: null, statusHTTP: 400 };
        }

        const jwt_data = userData;

        const jwt_token = jwt.sign(jwt_data, jwt_secret as Secret, { expiresIn: 86400 })

        return { error: false, message: 'Login realizado com sucesso', developerMessage: 'login successs', data: { token: jwt_token, user: userData }, statusHTTP: 200 }

    }

}