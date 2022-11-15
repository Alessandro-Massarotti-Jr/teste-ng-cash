import { PrismaClient } from "@prisma/client";
import { AccountVisibleData } from "./AccountModel";

const prisma = new PrismaClient();
export const UserModel = prisma.users;

export interface UserInterface{
    id: string
    username: string;
    password: string;
    account_id?:string;
}

export const UserVisibleData = {
    id: true,
    username: true,
    password:true,
    account_id:true,
    deleted:true,
    createdAt:true,
    updatedAt:true, 
}