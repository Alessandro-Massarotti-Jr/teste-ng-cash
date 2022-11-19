import api from "./api";

export class AccountService{

   public static async authUserAccount(){
      const response = await api.get('/accounts');
      return response.data.data;
    }

   
}
