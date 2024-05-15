import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { Users as UserModel } from '@packages/database';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.users.findMany();
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string): Promise<UserModel[]> {
    return this.prismaService.users.findMany({ where: { id: Number(id) } });
  }

  @Post('user')
  async createUser(
    @Body()
    userData: {
      login: string;
      email: string;
      password: string;
      lastName: string;
      firstName: string;
    },
  ): Promise<UserModel> {
    const { login, email, password, lastName, firstName } = userData;
    return this.prismaService.users.create({
      data: { login, email, password, lastName, firstName },
    });
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.prismaService.users.delete({ where: { id: Number(id) } });
  }
}
