import api from "./api";

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
        const response = await api.post('/transaction/filter',filterData);
        return response.data.data;
    }
    public static async cashOut(cashOutData: cashOutInterface) {
        const response = await api.post('/users', cashOutData);
        return response.data.data;
    }

}
