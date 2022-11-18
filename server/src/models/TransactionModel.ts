import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const TransactionModel = prisma.transactions;

export interface TransactionInterface {
    id: string,
    value: number,
    debited_account_id: string,
    credited_account_id: string,
}

export const TransactionVisibleData = {
    id: true,
    value: true,
    debited_account_id: true,
    credited_account_id: true,
    deleted: true,
    createdAt: true,
    updatedAt: true,
}