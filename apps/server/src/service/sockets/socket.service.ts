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

export type UserActiveDto = {
  userId: string;
  data: string;
};

export type UsersActiveDto = {
  userId: string;
  clientId: string;
  data: string;
};

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: MessageService) {}

  UsersInOnline: Array<UsersActiveDto> = [];

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connection ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnection ${client.id}`);

    const GetUserInOnline = this.UsersInOnline.find(
      (onlineUser) => onlineUser.clientId === client.id,
    );

    console.log(GetUserInOnline);

    // User delete in online list
    this.UsersInOnline = this.UsersInOnline.filter(
      (user) => user.clientId !== client.id,
    );

    if (GetUserInOnline?.userId !== undefined) {
      setTimeout(() => {
        const CheckUserReload = this.UsersInOnline.some(
          (user) => user.userId === GetUserInOnline.userId,
        );

        if (!CheckUserReload) {
          // Response all user in online
          client.broadcast.emit('user-in-app', this.UsersInOnline);

          client.disconnect(true);
        }
      }, 10000);
    }
  }

  @SubscribeMessage('user-in-app')
  async handleUserInApp(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: UserActiveDto,
  ) {
    const UserData: UsersActiveDto = {
      userId: data.userId,
      clientId: client.id,
      data: data.data,
    };

    const checkUserInOnline = this.UsersInOnline.some(
      (user) => user.userId === UserData.userId,
    );

    // Add user in online list
    if (!checkUserInOnline) {
      const CheckUserReload = this.UsersInOnline.some(
        (user) => user.userId === UserData.userId,
      );

      if (CheckUserReload) {
        console.log('updates');
        this.UsersInOnline = this.UsersInOnline.filter(
          (user) => user.userId === UserData.userId,
        );

        this.UsersInOnline.push(UserData);
      } else {
        this.UsersInOnline.push(UserData);
      }
    }

    client.broadcast.emit('user-in-app', this.UsersInOnline);
    client.emit('user-in-app', this.UsersInOnline);

    console.log('add', this.UsersInOnline);
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
