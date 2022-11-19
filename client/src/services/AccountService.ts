import api from "./api";
import { toast } from 'react-toastify'
export class AccountService{

   public static async authUserAccount(){
      await api.get('/accounts').then(response => {

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

    }

   
}
