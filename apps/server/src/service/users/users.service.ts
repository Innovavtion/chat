import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common/database/prisma.service';
import { Users as UserModel } from '@packages/database';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUser(): Promise<UserModel[]> {
    return this.prisma.users.findMany();
  }

  async getUser(id: string): Promise<UserModel[]> {
    return this.prisma.users.findMany({ where: { id: Number(id) } });
  }

  async createUser(userData: {
    login: string;
    email: string;
    password: string;
    lastName: string;
    firstName: string;
  }): Promise<UserModel> {
    const { login, email, password, lastName, firstName } = userData;
    return this.prisma.users.create({
      data: { login, email, password, lastName, firstName },
    });
  }

  async deleteUser(id: string): Promise<UserModel> {
    return this.prisma.users.delete({ where: { id: Number(id) } });
  }
}
