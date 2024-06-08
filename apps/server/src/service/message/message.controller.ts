import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import {
  CreateMessageDto,
  UpdateMessageDto,
  DeleteMessageDto,
} from './dto/message.dto';

import { MessageService } from './message.service';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from '../auth/interfaces/tokens.interface';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('messages-current-chat/:id')
  async getMessagesCurrentChat(
    @CurrentUser() user: JwtPayload,
    @Param('id', ParseIntPipe) chatId: number,
  ) {
    return this.messageService.getMessagesCurrentChat(user, chatId);
  }

  @Post('message-create-current-chat')
  async createMessageCurrentChat(
    @CurrentUser() user: JwtPayload,
    @Body() messageDto: CreateMessageDto,
  ) {
    return this.messageService.createMessageCurrentChat(user, messageDto);
  }

  @Put('message-update-current-chat')
  async updateMessageCurrentChat(
    @CurrentUser() user: JwtPayload,
    @Body() messageDto: UpdateMessageDto,
  ) {
    return this.messageService.updateMessageCurrentChat(user, messageDto);
  }

  @Delete('message-delete-current-chat')
  async deleteMessageCurrentChat(
    @CurrentUser() user: JwtPayload,
    @Body() messageDto: DeleteMessageDto,
  ) {
    return this.messageService.deleteMessageCurrentChat(user, messageDto);
  }
}
