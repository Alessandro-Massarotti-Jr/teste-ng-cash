import api from "./api";
import { toast } from 'react-toastify'

export interface authUserAccountInterface {
   id: string;
   balance: number;
}

export class AccountService {

   public static async authUserAccount() {
      let authUser = {}
      await api.get('/accounts').then(response => {

         authUser = response.data.data

         toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
         });

      }).catch(error => {

         toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
         });

      });

      return authUser as authUserAccountInterface

   }


}
