import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../../config/database/prisma.service';

import { User } from '@packages/database';
import { User as UserModel } from '@packages/database';

import { genSaltSync, hashSync } from 'bcrypt';

import { JwtPayload } from '../auth/interfaces/tokens.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAuthUser(user: JwtPayload) {
    const getUser = this.prisma.user.findMany({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        lastName: true,
        firstName: true,
        avatar: true,
        dataActive: true,
        dataRegistrate: true,
        roles: true,
      },
    });

    if (!getUser) {
      throw new HttpException(
        'Такого пользователя нет',
        HttpStatus.BAD_REQUEST,
      );
    }

    return getUser;
  }

  async getAllUser(): Promise<UserModel[]> {
    return this.prisma.user.findMany();
  }

  async getUser(id: string): Promise<UserModel[]> {
    const user = this.prisma.user.findMany({
      where: { id: id },
    });
    return user;
  }

  async createUser(user: Partial<User>) {
    const { login, email, password, provider, lastName, firstName } = user;

    const passwordHash = hashSync(password, genSaltSync(10));
    const getUserEmail = await this.prisma.user.findMany({
      where: { email: email },
    });

    if (getUserEmail) {
      const saveUser = await this.prisma.user.create({
        data: {
          login: login,
          email: email,
          lastName: lastName,
          firstName: firstName,
          password: passwordHash,
          provider: provider ?? null,
        },
      });

      return saveUser;
    } else {
      throw new HttpException('Email is registered', HttpStatus.CONFLICT);
    }
  }

  async updateUser(user: JwtPayload, userData: Partial<User>) {
    const { lastName, firstName } = userData;

    const getUser = this.prisma.user.findMany({
      where: { id: user.id },
    });

    if (!getUser) {
      throw new HttpException(
        'Такого пользователя нет',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updateUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { lastName: lastName, firstName: firstName },
    });

    return updateUser;
  }

  async deleteUser(user: JwtPayload): Promise<UserModel> {
    const getUser = this.prisma.user.findMany({
      where: { id: user.id },
    });

    if (!getUser) {
      throw new HttpException(
        'Такого пользователя нет',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.user.delete({ where: { id: user.id } });
  }
}
