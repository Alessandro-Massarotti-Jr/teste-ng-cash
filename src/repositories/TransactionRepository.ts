import { PrismaClient } from "@prisma/client";
import { TransactionInterface, TransactionVisibleData,TransactionModel } from "../models/TransactionModel";

const prisma = new PrismaClient();

export class TransactionRepository {

    public static async find(transaction_id: string) {
        const transaction = await TransactionModel.findUnique({
            where: {
                id: transaction_id,
            },
            select: TransactionVisibleData
        });

        async () => { await prisma.$disconnect(); };

        return transaction;
    }

    public static async store(transactionData:Omit<TransactionInterface,'id'>) {


        try{
            const newTransaction = await TransactionModel.create({
                data: {
                    value:transactionData.value,
                    credited_account_id:transactionData.credited_account_id,
                    debited_account_id:transactionData.debited_account_id
                },
                select: TransactionVisibleData
            });
    
            async () => { await prisma.$disconnect(); };
    
            return newTransaction;
        }catch(error){
          console.log(error);
          return null
        }


    }

    public static async update(transactionData: TransactionInterface) {
        const updatedTransaction = await TransactionModel.update({
            where: {
                id: transactionData.id
            },
            data: {
                value:transactionData.value,
                credited_account_id:transactionData.credited_account_id,
                debited_account_id:transactionData.debited_account_id
            },
            select: TransactionVisibleData
        });

        async () => {
            await prisma.$disconnect();
        }

        return updatedTransaction;
    }

    public static async delete(transaction_id: string) {
        const deletedTransaction = await TransactionModel.update({
            where: {
                id: transaction_id
            },
            data: {
                deleted: true
            },
            select:TransactionVisibleData
        });

        async () => { await prisma.$disconnect(); };

        return deletedTransaction;
    }

    public static async findAll() {
        const transactions = await TransactionModel.findMany({
            where: {
                deleted: false
            },
            select: TransactionVisibleData
        });

        async () => { await prisma.$disconnect(); };

        return transactions;
    }

}