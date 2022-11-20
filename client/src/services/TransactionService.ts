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

export interface TransactionDataInterface{
    id:string;
			value:number,
			credited_accounts: {
                id:string;
				balance:number
				createdAt: Date,
				updatedAt: Date,
				user: {
					id:string;
					username: string;
					password:string;
					account_id: string;
					deleted: boolean;
					createdAt:Date;
					updatedAt: Date;
				}
			},
			debited_accounts: {
                id:string;
				balance:number
				createdAt: Date,
				updatedAt: Date,
				user: {
					id:string;
					username: string;
					password:string;
					account_id: string;
					deleted: boolean;
					createdAt:Date;
					updatedAt: Date;
				}
			},
			createdAt: Date;
			updatedAt: Date;
}

export class TransactionService {

    public static async filter(filterData: filterInterface) {
        let transactionData:TransactionDataInterface[] | null[] = [];
        await api.post('/transaction/filter', filterData).then(response => {

            transactionData = response.data.data

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

            transactionData = error.response.data.data

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
   
        return transactionData;

    }
    public static async cashOut(cashOutData: cashOutInterface) {
        console.log(cashOutData)
        await api.post('/transaction', cashOutData).then(response => {

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
