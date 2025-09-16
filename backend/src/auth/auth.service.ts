// auth.service.ts

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthLoginDTO } from './dto/login.dto';
import { IUserFindOne } from 'src/users/interfaces/find-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(user: AuthLoginDTO ): Promise<any> {
    if (!user)
        return null;

    const userDB: IUserFindOne | null = await this.userService.findFirst({
      ...user
    });

    if (user && (user?.password === userDB?.password || userDB?.walletAddress === user?.walletAddress))
      return userDB;
    return null;
  }

  async login(user: AuthLoginDTO) {
    if (!await this.validateUser(user))
        throw new BadRequestException('Credential invalid');

    const payload = { email: user.email, sub: user.walletAddress };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}