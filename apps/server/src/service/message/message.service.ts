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

  // todo: Убрать при рефакторинге
  protected async getCurrentChat(user: JwtPayload, chatId: string) {
    const getUserParticipants = await this.prisma.chat.findMany({
      where: {
        particapants: { some: { userId: user.id, chatId: Number(chatId) } },
      },
    });

    const chatAccess = getUserParticipants.some((x) => x.id === Number(chatId));

    if (chatAccess) {
      const getContentChat = await this.prisma.chat.findMany({
        where: { id: Number(chatId) },
        include: {
          messages: {
            orderBy: { dataWrite: 'asc' },
            take: 50,
            select: { userId: true, text: true, dataWrite: true },
          },
        },
      });

      return getContentChat[0];
    }

    throw new HttpException(
      'У вас нет доступа к этому чату',
      HttpStatus.FORBIDDEN,
    );
  }

  // todo: Убрать при рефакторинге
  protected async createChat(user: JwtPayload, otherUser: string) {
    const currentIdUsers = [user.id, otherUser];

    const getUsers = await this.prisma.user.findMany({
      where: { id: { in: currentIdUsers } },
    });

    if (getUsers.length !== 2) {
      throw new HttpException(
        'Неверный id пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }

    const getChatParticapnts = await this.prisma.chat.findMany({
      where: {
        particapants: { every: { userId: { in: currentIdUsers } } },
      },
    });

    if (getChatParticapnts.length === 0) {
      const createChat = await this.prisma.chat.create({
        data: {
          dataCreate: new Date(),
          particapants: {
            create: [{ userId: user.id }, { userId: otherUser }],
          },
        },
      });

      return this.getCurrentChat(user, String(createChat.id));
    }

    return this.getCurrentChat(user, String(getChatParticapnts[0]?.id));
  }

  // todo: Переписать при рефакторинге
  async createMessageCurrentChat(
    user: JwtPayload,
    messageDto: CreateMessageDto,
  ) {
    if (messageDto.chatId === 'undefined') {
      const newChat = await this.createChat(user, messageDto.otherUserId);

      const getAccessChat = await this.prisma.chat.findMany({
        where: {
          particapants: {
            some: { userId: user.id, chatId: newChat.id },
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
    } else {
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
