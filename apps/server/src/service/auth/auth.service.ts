import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { PrismaService } from 'src/config/database/prisma.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { genSaltSync, hashSync, compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const { login, email, lastName, firstName, password } = registerDto;

    const getUserEmail = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (getUserEmail) {
      throw new HttpException('Email is registered', HttpStatus.CONFLICT);
    }

    const passwordHash = hashSync(password, genSaltSync(10));

    const saveUser = await this.prisma.user.create({
      data: {
        login: login,
        email: email,
        lastName: lastName,
        firstName: firstName,
        password: passwordHash,
      },
    });

    return saveUser;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user || !compareSync(password, user.password)) {
      throw new HttpException(
        'Неправильный логин или пароль',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return { message: 'Вы условно авторизированны', user };
  }

  async logout() {}

  async generateTokens() {}

  async refreshTokens() {}

  async getRefreshTokens() {}

  async deleteRefreshTokens() {}

  async providerAuth() {}
}
