import { UserInterface } from "../models/UserModel";

export class UserRequest {
    public static validateStore(store_data:Omit<UserInterface,'id'>){

        if(!store_data.username){
            return { error: true, developerMessage: 'User username is required', message: 'username precisa ser informado', data: null, statusHTTP: 400 }
        }

        if(!store_data.password){
            return { error: true, developerMessage: 'User password is required', message: 'senha precisa ser informado', data: null, statusHTTP: 400 }
        }

        if(store_data.username.length < 3){
            return { error: true, developerMessage: 'User username need to have at last 3 caracters', message: 'username precisa ter pelo menos 3 caracteres', data: null, statusHTTP: 400 }
        }

        if(store_data.password.length < 8){
            return { error: true, developerMessage: 'User password need to have at last 8 caracters', message: 'senha precisa ter pelo menos 8 caracteres', data: null, statusHTTP: 400 }
        }

        if(!/[A-Z]/.test(store_data.password)){
            return { error: true, developerMessage: 'User password need to have at last 1 capital letter', message: 'senha precisa ter pelo menos 1 caracter em maiusculo', data: null, statusHTTP: 400 }
        }
        if(!/\d/.test(store_data.password)){
            return { error: true, developerMessage: 'User password need to have at last 1 number', message: 'senha precisa ter pelo menos 1 numero', data: null, statusHTTP: 400 }
        }

        return { error: false, developerMessage: '', message: '', data: null, statusHTTP: 200 }

    }
}