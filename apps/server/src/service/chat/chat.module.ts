import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { SocketService } from './socket/socket.service';
import { MessageService } from '../message/message.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, MessageService, SocketService],
})
export class ChatModule {}
