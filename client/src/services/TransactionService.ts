import api from "./api";
import { toast } from 'react-toastify'

export interface cashOutInterface {
    cashInUser: string;
    value: number;
}

export interface filterInterface {
    cashIn: boolean;
    cashOut: boolean;
    date_start: string;
    date_end: string;
}

export class TransactionService {

    public static async filter(filterData:filterInterface) {
       await api.post('/transaction/filter',filterData).then(response => {

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
    public static async cashOut(cashOutData: cashOutInterface) {
       await api.post('/users', cashOutData).then(response => {

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
