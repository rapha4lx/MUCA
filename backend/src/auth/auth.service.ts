// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    if (user && (user.password === userDB?.password || userDB?.walletAddress === ''))
      return userDB;
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}