import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from "class-validator";


class KittyWalletDTO {
    @IsString()
    @IsNotEmpty()    
    wallet: string;

    @IsInt()
    @IsNotEmpty()    
    percentage: number
}

export class CreateKittyDTO {
    @IsString()
    @IsNotEmpty()    
    name: string;

    @IsArray()
    @ValidateNested( { each: true } )
    @IsNotEmptyObject()
    @Type(() => KittyWalletDTO)
    wallets: KittyWalletDTO[];

    @IsNumber({ allowInfinity: false, allowNaN: false})
    maxValue: number;
}