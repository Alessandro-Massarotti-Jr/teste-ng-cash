import { PrismaClient } from "@prisma/client";
import { AccountVisibleData } from "./AccountModel";

const prisma = new PrismaClient();
export const UserModel = prisma.transactions;

export interface TransactionInterface{
    id:string,
    value:number,             
    debited_account_id:string, 
    credited_account_id:string,  
}

export const transactionVisibleData = {
    id:true,
    value:true,             
    debited_account_id:true, 
    credited_account_id:true, 
    deleted:true,           
    createdAt:true, 
    updatedAt:true,             
}