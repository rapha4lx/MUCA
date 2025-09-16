import { PrismaClient } from "generated/prisma";
import { CreateKittyDTO } from "./dto/create-kitty.dto";
import { UnauthorizedException } from "@nestjs/common";
import { elementAt } from "rxjs";
import { CreateDonationDTO } from "./dto/create-donation.dto";

const prisma = new PrismaClient();

export class DonationsService {

    async getAllKittys() {
        try {
            const donations = await prisma.kitty.findMany();
            return donations;
        } catch (error) {
            console.error(error);
            throw new Error('It was not posible find donations');
        }
    }

    async getOneKitty(uuid: string) {
        try {
            if (!uuid)
                throw new Error('empty uuid');
            const donation = await prisma.kitty.findUnique({
                where: {
                    id: uuid,
                },
                include: {
                    wallets: true,
                    donations: true
                }
            });
            return donation;
        }catch (error) {
            console.log(error);
            return error;
        }
    }

    async createKitty(kittyInfo: CreateKittyDTO) {
        try {
            const kitty = await prisma.kitty.create({
                data: {
                    name: kittyInfo.name,
                    maxValue: kittyInfo.maxValue,
                    wallets: {
                        create: kittyInfo.wallets.map(wallet => ({
                            wallet: wallet.wallet,
                            percentage: wallet.percentage
                        }))
                    }
                },
                include: {
                    wallets: true
                }
            });

            if (!kitty)
                throw new UnauthorizedException('Falha ao criar a kitty.');

            return kitty;
        }catch (error) {
            console.log(error);
            throw new Error('');
        }
    }

    async getAllDonationsFromKitty(uuid: string) {
        try {
            if (!uuid)
                throw new Error('empty uuid');
            const donations = await prisma.kitty.findUnique({
                where: {
                    id: uuid,
                },
                select: {
                    donations: true
                }
            });

            if (!donations)
                throw new Error('Not finded donations');

            return donations;
        }catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    async createDonation(data: CreateDonationDTO) {
        try {
            const donation = prisma.donation.create({
                data: {
                    wallet: data.wallet,
                    token: data.token,
                    amount: data.amount,
                    kittyId: data.kittyId,
                }
            });

            if (!donation)
                throw new Error('Fail in link Donation');

            return donation;
        }catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}