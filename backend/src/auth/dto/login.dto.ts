import { IsOptional, IsString } from 'class-validator';

export class AuthLoginDTO {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    walletAddress: string;
}