import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DonationsService } from "./donations.service";
import { CreateDonationDTO } from "./dto/create-donation.dto";



@Controller('donations')
export class DonationsController {
    constructor (private donationsService: DonationsService) {}

    @Get('getAllKittys')
    async getAllKittys() {
        return await this.donationsService.getAllKittys();
    }

    @Get('getOneKitty')
    async getOneKitty(@Body() data) {
        return await this.donationsService.getOneKitty(data.uuid);
    }

    @Post('createKitty')
    async createKitty(@Body() data) {
        return await this.donationsService.createKitty(data);
    }

    @Get('getAllDonationsFromKitty')
    async getAllDonationsFromKitty(@Body() data) {
        return await this.donationsService.getAllDonationsFromKitty(data.uuid);
    }

    @Post('createDonation')
    async createDonation(@Body() data: CreateDonationDTO) {
        return await this.donationsService.createDonation(data);
    }
}