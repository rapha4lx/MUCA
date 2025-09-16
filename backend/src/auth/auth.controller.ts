// auth.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: AuthLoginDTO) {
    const user = await this.authService.validateUser(signInDto);
    if (!user) {
      // Retorne um erro ou uma mensagem adequada para credenciais inválidas
    }
    return this.authService.login(user);
  }
}