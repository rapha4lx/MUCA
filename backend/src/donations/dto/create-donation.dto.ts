import { IsNotEmpty, IsNumber, IsString } from "class-validator";




export class CreateDonationDTO {
    @IsString()
    @IsNotEmpty()
    kittyId: string;

    @IsString()
    @IsNotEmpty()
    wallet: string;

    @IsString()
    @IsNotEmpty()
    token: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}