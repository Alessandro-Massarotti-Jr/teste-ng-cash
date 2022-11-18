
type CashOutDataInterface = {
    cashInUser: string,
    value: number
}

export class TrasactionRequests {
    public static validateCashOut(cashOutData: CashOutDataInterface) {
        if (!cashOutData.cashInUser) {
            return { error: true, message: "Nome do usuario a receber é necessario", developerMessage: "CashInUser username is required", data: null, statusHTTP: 400 }
        }
        if (!cashOutData.value) {
            return { error: true, message: "Valor da transação é necessario", developerMessage: "value is required", data: null, statusHTTP: 400 }
        }
        if (isNaN(cashOutData.value)) {
            return { error: true, message: "Valor da transação deve ser um numero", developerMessage: "value need to be a number", data: null, statusHTTP: 400 }
        }

        return { error: false, message: "dados validados", developerMessage: "data validated", data: null, statusHTTP: 200 }
    }
}