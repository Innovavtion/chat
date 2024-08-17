import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { MessageService } from 'src/service/message/message.service';
import { CreateMessageDto } from 'src/service/message/dto/message.dto';

export type TypingChatUser = {
  chatId: string;
  userId: string;
};

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: MessageService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connection ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnection ${client.id}`);
    client.disconnect(true);
  }

  @SubscribeMessage('join-chat')
  handleJoinChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() chatId: string,
  ) {
    console.log(`Client ${client.id} - joined chat: ${chatId}`);
    client.join(chatId);
    return chatId;
  }

  @SubscribeMessage('leave-chat')
  handleLeaveChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() chatId: string,
  ) {
    console.log(`Client ${client.id} - leaving chat: ${chatId}`);
    client.leave(chatId);
    return chatId;
  }

  @SubscribeMessage('typing-chat')
  async handleTypingChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: TypingChatUser,
  ) {
    client.to(data.chatId).emit('typing-chat', data);
  }

  @SubscribeMessage('create-message')
  async handleCreateMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: CreateMessageDto,
  ) {
    client.to(data.chatId).emit('create-message', data);
  }
}
