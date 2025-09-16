import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { GetOneUserDTO } from "./dto/get-user.dto";

@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService) {}

    @Get('getAllUsers')
    async getAllUsers() {
        return await this.usersService.getAllUsers();
    }

    @Get('getOne')
    async getOne(@Body() userInfo: GetOneUserDTO) {
        return await this.usersService.findFirst(userInfo);
    }

    @Post('createUser')
    async createUser(@Body() userInfo: CreateUserDTO) {
        return await this.usersService.createUser(userInfo);
    }
}