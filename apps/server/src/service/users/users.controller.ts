import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUser();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post()
  async createUser(
    @Body()
    userData: {
      login: string;
      email: string;
      password: string;
      lastName: string;
      firstName: string;
    },
  ) {
    return this.userService.createUser(userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
