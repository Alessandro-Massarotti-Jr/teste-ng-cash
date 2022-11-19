import api from "./api";
import { UserDataInterface } from "./UserService";

export class AuthService{

   public static async login(userData:UserDataInterface){
      const response = await api.post('/auth/login',userData);
      return response.data.data;
    }
    public static async logout(){
        const response = await api.get('/auth/logout');
        return response.data.data;
    }
   
}
