import { Controller, Get, Param, Body, Delete, Put } from '@nestjs/common';

import { UserService } from './user.service';

import { JwtPayload } from '../auth/interfaces/tokens.interface';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import {
  UserUpdateEmailDto,
  UserUpdateNameDto,
  UserUpdatePasswordDto,
} from './dto/user.dto';

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

  @Put('update-username')
  async updateUserName(
    @CurrentUser() user: JwtPayload,
    @Body() dataUser: UserUpdateNameDto,
  ) {
    const response = await this.userService.updateUserName(user, dataUser);

    return response;
  }

  @Put('update-email')
  async updateUserEmail(
    @CurrentUser() user: JwtPayload,
    @Body() dataUser: UserUpdateEmailDto,
  ) {
    const response = await this.userService.updateUserEmail(user, dataUser);

    return response;
  }

  @Put('update-password')
  async updateUserPassword(
    @CurrentUser() user: JwtPayload,
    @Body() dataUser: UserUpdatePasswordDto,
  ) {
    const response = await this.userService.updateUserPassword(user, dataUser);

    return response;
  }

  @Put()
  @Delete()
  async deleteUser(@CurrentUser() user: JwtPayload) {
    return this.userService.deleteUser(user);
  }
}
