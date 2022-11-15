import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import { UserInterface, UserVisibleData,UserModel } from "../models/UserModel";

const prisma = new PrismaClient();

export class UserRepository {

    public static async find(user_id: string) {
        const user = await UserModel.findUnique({
            where: {
                id: user_id,
            },
            select: UserVisibleData
        });

        async () => { await prisma.$disconnect(); };

        return user;
    }

    public static async findbyUsername(user_username: string) {
        const user = await UserModel.findUnique({
            where: {
                username: user_username,
            },
            select: UserVisibleData
        });

        async () => { await prisma.$disconnect(); };

        return user;
    }

    public static async store(user: Omit<UserInterface, 'id'>) {

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(user.password, salt);

        try{
            const newUser = await UserModel.create({
                data: {
                    username: user.username,
                    password: passwordHash,
                    
                },
                select: UserVisibleData
            });
    
            async () => { await prisma.$disconnect(); };
    
            return newUser;
        }catch(error){
          console.log(error);
          return null
        }


    }

    public static async update(user: UserInterface) {
        const updatedUser = await UserModel.update({
            where: {
                id: user.id
            },
            data: {
                username: user.username,
                password: user.password,
                account_id:user.account_id
            },
            select: UserVisibleData
        });

        async () => {
            await prisma.$disconnect();
        }

        return updatedUser;
    }

    public static async delete(user_id: string) {
        const deletedUser = await UserModel.update({
            where: {
                id: user_id
            },
            data: {
                deleted: true
            },
            select:UserVisibleData
        });

        async () => { await prisma.$disconnect(); };

        return deletedUser;
    }

    public static async forceDelete(user_id: string) {
        const deletedUser = await UserModel.delete({
            where: {
                id: user_id
            },
            select:UserVisibleData
        });

        async () => { await prisma.$disconnect(); };

        return deletedUser;
    }

    public static async findAll() {
        const users = await UserModel.findMany({
            where: {
                deleted: false
            },
            select: UserVisibleData
        });

        async () => { await prisma.$disconnect(); };

        return users;
    }

}