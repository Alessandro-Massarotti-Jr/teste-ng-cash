import { UserInterface } from "../models/UserModel";
import { AccountRepository } from "../repositories/AccountRepository";
import { UserRepository } from "../repositories/UserRepository";

export class SignupService{
    public static async execute(data:Omit<UserInterface,'id'>){
        const verify = await UserRepository.findbyUsername(data.username);
        if (verify) {
            return { error: true, developerMessage: 'User exists', message: 'Usuario ja cadastrado no sistema', data: null, statusHTTP: 400 }
        }
        const new_user = await UserRepository.store(data);

        if(!new_user){
            return { error: true, developerMessage: 'error in create user', message: 'Erro ao criar usuario', data: null, statusHTTP: 500 }
        }

        const new_account = await AccountRepository.store();

        if(!new_account){
            UserRepository.forceDelete(new_user.id)
            return { error: true, developerMessage: 'error in create user account', message: 'Erro ao criar conta do usuario', data: null, statusHTTP: 500 }
        }

        new_user.account_id = new_account.id as string;
        const addAccountToUserResponse = await UserRepository.update(new_user as UserInterface);

        return { error: false, developerMessage: 'user created', message: 'Usuario Criado com sucesso', data: addAccountToUserResponse, statusHTTP: 201 }

    }
}