import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { DonationsService } from "./donations.service";
import { CreateDonationDTO } from "./dto/create-donation.dto";
import { AuthGuard } from "@nestjs/passport";



@Controller('donations')
export class DonationsController {
    constructor (private donationsService: DonationsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('getAllKittys')
    async getAllKittys() {
        return await this.donationsService.getAllKittys();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getOneKitty')
    async getOneKitty(@Body() data) {
        return await this.donationsService.getOneKitty(data.uuid);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('createKitty')
    async createKitty(@Body() data) {
        return await this.donationsService.createKitty(data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getAllDonationsFromKitty')
    async getAllDonationsFromKitty(@Body() data) {
        return await this.donationsService.getAllDonationsFromKitty(data.uuid);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('createDonation')
    async createDonation(@Body() data: CreateDonationDTO) {
        return await this.donationsService.createDonation(data);
    }
}