import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { PrismaService } from 'src/config/database/prisma.service';
import { JwtService } from '@nestjs/jwt';

import { Token, User } from '@packages/database';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { genSaltSync, hashSync, compareSync } from 'bcrypt';

import { v4 } from 'uuid';
import { add } from 'date-fns';
import { Tokens } from './interfaces/tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(loginDto: LoginDto, agent: string) {
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

    return this.generateTokens(user, agent);
  }

  async logout() {}

  async refreshTokens(refreshToken: string, agent: string): Promise<Tokens> {
    const token = await this.prisma.token.delete({
      where: { token: refreshToken },
    });

    if (!token || new Date(token.exp) < new Date()) {
      throw new HttpException('Token dont refresh', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: token.userId },
    });

    return this.generateTokens(user, agent);
  }

  async generateTokens(user: User, agent: string): Promise<Tokens> {
    const { id, email, roles } = user;

    const accessToken =
      'Bearer ' + this.jwtService.sign({ id: id, email: email, roles: roles });

    const refreshToken = await this.getRefreshTokens(String(id), agent);

    return { accessToken, refreshToken };
  }

  async getRefreshTokens(userId: string, agent: string): Promise<Token> {
    console.log(userId, agent);

    const getToken = await this.prisma.token.findFirst({
      where: { userId, userAgent: agent },
    });

    console.log(getToken);

    const token = getToken?.token ?? '';

    return this.prisma.token.upsert({
      where: { token },
      update: { token: v4(), exp: add(new Date(), { months: 1 }) },
      create: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
        userId: userId,
        userAgent: agent,
      },
    });
  }

  async deleteRefreshTokens(token: string) {
    return this.prisma.token.delete({ where: { token } });
  }

  async providerAuth() {}
}
