import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const AccountModel = prisma.accounts;

export interface AccountInterface {
    id: string
    balance: number
}

export const AccountVisibleData = {
    id: true,
    balance: true,
    deleted: true,
    createdAt: true,
    updatedAt: true,
}