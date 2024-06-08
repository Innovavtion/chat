import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma.service';

import {
  CreateMessageDto,
  UpdateMessageDto,
  DeleteMessageDto,
} from './dto/message.dto';

import { JwtPayload } from '../auth/interfaces/tokens.interface';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async getMessagesCurrentChat(user: JwtPayload, chatId: number) {
    const getChatMessage = await this.prisma.chat.findMany({
      where: {
        particapants: {
          some: { userId: user.id, chatId: chatId },
        },
      },
      include: { messages: true },
    });

    if (!getChatMessage.length) {
      throw new HttpException(
        'Вы не состоите в данном чате',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return getChatMessage;
  }

  async createMessageCurrentChat(
    user: JwtPayload,
    messageDto: CreateMessageDto,
  ) {
    const getAccessChat = await this.prisma.chat.findMany({
      where: {
        particapants: {
          some: { userId: user.id, chatId: Number(messageDto.chatId) },
        },
      },
    });

    if (!getAccessChat.length) {
      throw new HttpException(
        'Вы не состоите в данном чате',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const createChatMessage = await this.prisma.message.create({
      data: {
        userId: user.id,
        chatId: Number(messageDto.chatId),
        text: messageDto.message,
        dataWrite: new Date(),
      },
    });

    return createChatMessage;
  }

  async updateMessageCurrentChat(
    user: JwtPayload,
    messageDto: UpdateMessageDto,
  ) {
    const getAccessMessage = await this.prisma.message.findUnique({
      where: {
        id: Number(messageDto.messageId),
        userId: user.id,
        chatId: Number(messageDto.chatId),
      },
    });

    if (!getAccessMessage) {
      throw new HttpException(
        'Это сообщение опубликовали не вы',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const updateChatMessage = await this.prisma.message.update({
      where: {
        id: Number(messageDto.messageId),
        userId: user.id,
        chatId: Number(messageDto.chatId),
      },
      data: {
        text: messageDto.message,
      },
      select: { id: true, userId: true, text: true, dataWrite: true },
    });

    return updateChatMessage;
  }

  async deleteMessageCurrentChat(
    user: JwtPayload,
    messageDto: DeleteMessageDto,
  ) {
    const getAccessMessage = await this.prisma.message.findUnique({
      where: {
        id: Number(messageDto.messageId),
        userId: user.id,
        chatId: Number(messageDto.chatId),
      },
    });

    if (!getAccessMessage) {
      throw new HttpException(
        'Это сообщение опубликовали не вы',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const deleteChatMessage = await this.prisma.message.delete({
      where: {
        id: Number(messageDto.messageId),
        userId: user.id,
        chatId: Number(messageDto.chatId),
      },
    });

    return deleteChatMessage;
  }
}
