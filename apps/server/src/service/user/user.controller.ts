import { Controller, Get, Param, Body, Delete, Put } from '@nestjs/common';

import { UserService } from './user.service';

import { User } from '@packages/database';

import { JwtPayload } from '../auth/interfaces/tokens.interface';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('auth')
  async getAuthUser(@CurrentUser() user: JwtPayload) {
    return this.userService.getAuthUser(user);
  }

  @Get('all')
  async getAllUsers() {
    return this.userService.getAllUser();
  }

  @Get(':id')
  async getUser(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Put()
  async updateUser(
    @CurrentUser() user: JwtPayload,
    @Body() dataUser: Partial<User>,
  ) {
    return this.userService.updateUser(user, dataUser);
  }

  @Delete()
  async deleteUser(@CurrentUser() user: JwtPayload) {
    return this.userService.deleteUser(user);
  }
}
