import { Controller, Get, Put, Post, Delete, Body } from '@nestjs/common';

import { FriendService } from './friend.service';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from '../auth/interfaces/tokens.interface';
import { FriendDto } from './dto/friend.dto';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get('all-unfriends')
  async getAllUnfriends(@CurrentUser() user: JwtPayload) {
    return this.friendService.getAllUnfriends(user.id);
  }

  @Get('all')
  async getUserFriends(@CurrentUser() user: JwtPayload) {
    return this.friendService.getUserFriends(user.id);
  }

  @Get('user-invite-friends')
  async getUserInviteFriends(@CurrentUser() user: JwtPayload) {
    return this.friendService.getUserInviteFriends(user.id);
  }

  @Get('user-receiving-friends')
  async getUserReceivingFriends(@CurrentUser() user: JwtPayload) {
    return this.friendService.getUserReceivingFriends(user.id);
  }

  @Put('user-accept-invite')
  async acceptUserInFriends(
    @CurrentUser() user: JwtPayload,
    @Body() friendDto: FriendDto,
  ) {
    return this.friendService.acceptUserInFriends(user.id, friendDto.id);
  }

  @Post('new')
  async addUserFriend(
    @CurrentUser() user: JwtPayload,
    @Body() friendDto: FriendDto,
  ) {
    return this.friendService.inviteUserInFriends(user.id, friendDto.id);
  }

  @Delete('reject-invite-friends')
  async rejectInviteFriends(
    @CurrentUser() user: JwtPayload,
    @Body() friendDto: FriendDto,
  ) {
    return this.friendService.rejectionInviteInFriends(user.id, friendDto.id);
  }

  @Delete('reject-receiving-friends')
  async rejectReceivingFriends(
    @CurrentUser() user: JwtPayload,
    @Body() friendDto: FriendDto,
  ) {
    return this.friendService.rejectionReceivingInFriends(
      user.id,
      friendDto.id,
    );
  }

  @Delete('remove')
  async deleteUserFriend(
    @CurrentUser() user: JwtPayload,
    @Body() friendDto: FriendDto,
  ) {
    return this.friendService.deleteUserIsFriends(user.id, friendDto.id);
  }
}
