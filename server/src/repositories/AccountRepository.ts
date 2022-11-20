import { PrismaClient } from "@prisma/client";
import { AccountInterface, AccountVisibleData, AccountModel } from "../models/AccountModel";

const prisma = new PrismaClient();

export class AccountRepository {

    public static async find(account_id: string) {
        const account = await AccountModel.findUnique({
            where: {
                id: account_id,
            },
            select: AccountVisibleData
        });

        async () => { await prisma.$disconnect(); };
        return account;
    }

    public static async store() {


        try {
            const newAccount = await AccountModel.create({
                data: {
                    balance: 100
                },
                select: AccountVisibleData
            });

            async () => { await prisma.$disconnect(); };

            return newAccount;
        } catch (error) {
            console.log(error);
            return null
        }


    }

    public static async update(account: AccountInterface) {
        const updatedAccount = await AccountModel.update({
            where: {
                id: account.id
            },
            data: {
                balance: Number(account.balance)
            },
            select: AccountVisibleData
        });

        async () => {
            await prisma.$disconnect();
        }

        return updatedAccount;
    }

    public static async delete(account_id: string) {
        const deletedAccount = await AccountModel.update({
            where: {
                id: account_id
            },
            data: {
                deleted: true
            },
            select: AccountVisibleData
        });

        async () => { await prisma.$disconnect(); };

        return deletedAccount;
    }

    public static async forceDelete(account_id: string) {
        const deletedAccount = await AccountModel.delete({
            where: {
                id: account_id
            },
            select: AccountVisibleData
        });

        async () => { await prisma.$disconnect(); };

        return deletedAccount;
    }

    public static async findAll() {
        const accounts = await AccountModel.findMany({
            where: {
                deleted: false
            },
            select: AccountVisibleData
        });

        async () => { await prisma.$disconnect(); };

        return accounts;
    }

}