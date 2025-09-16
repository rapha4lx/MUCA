import { Body, Controller, Get } from "@nestjs/common";
import { StellarService } from "./stellar.service";



@Controller('stellar')
export class StellarController {
    constructor (private stellarService: StellarService) {}

    @Get('getAccount')
    async getAccount(@Body() data) {
        return await this.stellarService.getAccountInfo(data.address);
    }
}