import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../../config/database/prisma.service';

import { User } from '@packages/database';
import { User as UserModel } from '@packages/database';

import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUser(): Promise<UserModel[]> {
    return this.prisma.user.findMany();
  }

  async getUser(id: string): Promise<UserModel[]> {
    const passwordUnHash = this.prisma.user.findMany({
      where: { id: id },
    });
    return passwordUnHash;
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

  async updateUser(id: string, user: Partial<User>) {
    const { lastName, firstName } = user;

    const updateUser = await this.prisma.user.update({
      where: { id: id },
      data: { lastName: lastName, firstName: firstName },
    });

    return updateUser;
  }

  async deleteUser(id: string): Promise<UserModel> {
    return this.prisma.user.delete({ where: { id: id } });
  }
}
