import { Module } from '@nestjs/common';
import { ChatController } from '../chat/chat.controller';
import { ChatService } from '../chat/chat.service';
import { MessageService } from '../message/message.service';
import { SocketService } from '../sockets/socket.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, MessageService, SocketService],
})
export class SocketModule {}
