import api from "./api";

export interface UserDataInterface {
    username:string;
    password:string;
}

export class UserService{

   public static async authUser(){
      const response = await api.get('/users/auth-user');
      return response.data.data;
    }
    public static async store(userData:UserDataInterface){
        const response = await api.post('/users',userData);
        return response.data.data;
    }
   
}

