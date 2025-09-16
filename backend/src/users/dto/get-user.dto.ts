import { IsOptional, IsNumber, IsString, IsEmail } from 'class-validator';

export class GetOneUserDTO {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    name?: string;
}