import { TransactionInterface } from "../models/TransactionModel";
import { AccountRepository } from "../repositories/AccountRepository";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { UserRepository } from "../repositories/UserRepository";

export class CashOutService {
    public static async execute(transactionData: Omit<TransactionInterface, 'id'>) {
        const cashOutAccount = await AccountRepository.find(transactionData.debited_account_id);

        if (!cashOutAccount) {
            return { error: true, message: "usuario não encontrado", developerMessage: "user not found id", data: null, statusHTTP: 400 }
        }

        if (cashOutAccount?.balance - transactionData.value < 0) {
            return { error: true, message: "valor a ser transferido não pode ser maior que o valor em conta", developerMessage: "can not do a transaction with valua bigger than your balance", data: null, statusHTTP: 400 }
        }

        const cashInAccount = await AccountRepository.find(transactionData.credited_account_id);

        if (!cashInAccount) {
            return { error: true, message: "usuario não encontrado", developerMessage: "user not found cash in", data: null, statusHTTP: 400 }
        }

        const cashOutOldBalance = cashOutAccount.balance;
        const cashInOldValue = cashInAccount.balance;

        cashOutAccount.balance = cashOutAccount.balance - transactionData.value;
        cashInAccount.balance = cashInAccount.balance + transactionData.value;

        const updateCashOutResponse = await AccountRepository.update(cashOutAccount);

        if (!updateCashOutResponse) {
            return { error: true, message: "erro ao realizar transação", developerMessage: "error in cash out", data: null, statusHTTP: 500 }
        }

        const updateCashInResponse = await AccountRepository.update(cashInAccount);

        if (!updateCashInResponse) {
            cashOutAccount.balance = cashOutOldBalance;
            AccountRepository.update(cashOutAccount);
            return { error: true, message: "erro ao realizar transação", developerMessage: "error in cash in", data: null, statusHTTP: 500 }
        }

        const newTransaction = await TransactionRepository.store(transactionData);

        if (!newTransaction) {
            cashOutAccount.balance = cashOutOldBalance;
            AccountRepository.update(cashOutAccount);
            cashInAccount.balance = cashInOldValue;
            AccountRepository.update(cashInAccount);
            return { error: true, message: "erro ao realizar transação", developerMessage: "error in make transaction", data: null, statusHTTP: 500 }
        }

        return { error: false, message: "Tranzação realizada com sucesso", developerMessage: "trasaction created", data: newTransaction, statusHTTP: 201 }


    }

}