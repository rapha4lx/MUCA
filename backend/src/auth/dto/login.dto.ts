import { IsOptional, IsString } from 'class-validator';

export class AuthLoginDTO {
    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    walletAddress: string;
}