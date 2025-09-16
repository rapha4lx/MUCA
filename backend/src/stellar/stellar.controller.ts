import { Body, Controller, Get, UseGuards } from "@nestjs/common";
import { StellarService } from "./stellar.service";
import { AuthGuard } from "@nestjs/passport";



@Controller('stellar')
export class StellarController {
    constructor (private stellarService: StellarService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('getAccount')
    async getAccount(@Body() data) {
        return await this.stellarService.getAccountInfo(data.address);
    }
}