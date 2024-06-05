import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';

import { ChatService } from './chat.service';

import { JwtPayload } from '../auth/interfaces/tokens.interface';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateChatDto } from './dto/create-chat.dto';
import { DeleteChatDto } from './dto/delete-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('user-chats')
  async getUserChats(@CurrentUser() user: JwtPayload) {
    return this.chatService.getUserChats(user);
  }

  @Get('current-chat/:id')
  async getCurrentChat(
    @CurrentUser() user: JwtPayload,
    @Param('id') chatId: string,
  ) {
    return this.chatService.getCurrentChat(user, chatId);
  }

  @Post('create-chat')
  async createChat(
    @CurrentUser() user: JwtPayload,
    @Body() otherUser: CreateChatDto,
  ) {
    return this.chatService.createChat(user, otherUser);
  }

  /*
  @Put('update-chat')
  async updateChat() {
    return this.chatService.updateChat();
  }
  */

  @Delete('delete-chat')
  async deleteChat(
    @CurrentUser() user: JwtPayload,
    @Body() chat: DeleteChatDto,
  ) {
    return this.chatService.deleteChat(user, chat);
  }
}
