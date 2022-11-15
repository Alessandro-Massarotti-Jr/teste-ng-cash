import { TransactionInterface } from "../models/TransactionsModel";
import { AccountRepository } from "../repositories/AccountRepository";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { UserRepository } from "../repositories/UserRepository";

export class CashOutService {
    public static async execute(transactionData: Omit<TransactionInterface, 'id'>) {
        const cashOutAccount = await AccountRepository.find(transactionData.debited_account_id);

        if (!cashOutAccount) {
            return
        }

        if (cashOutAccount?.balance - transactionData.value > 0) {
            return
        }

        const cashInAccount = await AccountRepository.find(transactionData.credited_account_id);

        if (!cashInAccount) {
            return
        }

        const cashOutOldBalance = cashOutAccount.balance;
        const cashInOldValue = cashInAccount.balance;

        cashOutAccount.balance = cashOutAccount.balance - transactionData.value;
        cashInAccount.balance = cashInAccount.balance + transactionData.value;

        const updateCashOutResponse = await AccountRepository.update(cashOutAccount);
        const updateCashInResponse = await AccountRepository.update(cashInAccount);

        const newTransaction = TransactionRepository.store(transactionData);

        return 


    }

}