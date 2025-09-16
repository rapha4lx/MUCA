import { PrismaClient } from 'generated/prisma';
import { ICreateUser } from './interfaces/create-user.interface';
import { IUserFindOne } from './interfaces/find-user.interface';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

const prisma = new PrismaClient();

export class UsersService {

    async getAllUsers() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch(error) {
            console.error('It was not posible find users');
            throw new Error('It was not posible find users');
        }
    };

    async createUser(userInfo: ICreateUser) {
        try {
            const user = await prisma.user.create({
                data: {...userInfo}
            });
            if (!user)
              throw new UnauthorizedException('Credenciais de login inválidas.');
            return user;
        } catch (error) {
            throw new Error(error);
        }
    };

    async findFirst(userInfo: IUserFindOne): Promise<IUserFindOne | null> {
        try {
            if (!(userInfo.email && userInfo.id && userInfo.walletAddress))
            {
                console.error("erro");
                throw new UnauthorizedException('Credenciais de login inválidas.');
            }
            const user: IUserFindOne | null = await prisma.user.findFirst({
                where: {
                    ...userInfo
                },
                select: {
                    id: true,
                    email: true,
                    walletAddress: true
                }
            });
            return user;
        } catch (error) {
            // console.error(error);
            return error
        }
    };
}
