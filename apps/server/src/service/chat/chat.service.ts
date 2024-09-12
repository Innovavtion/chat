import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/config/database/prisma.service';
import { JwtPayload } from '../auth/interfaces/tokens.interface';
import { CreateChatDto } from './dto/create-chat.dto';
import { DeleteChatDto } from './dto/delete-chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserChats(user: JwtPayload) {
    const getUserParticipants = await this.prisma.chat.findMany({
      where: {
        particapants: { some: { userId: user.id } },
      },
      include: {
        particapants: {
          where: { userId: { not: user.id } },
          select: { userId: true },
        },
        messages: {
          orderBy: { id: 'desc' },
          take: 1,
          select: { text: true, dataWrite: true },
        },
      },
    });

    if (!getUserParticipants) {
      throw new HttpException('Вы не состоите в чатах', HttpStatus.NO_CONTENT);
    }

    return getUserParticipants;
  }

  async getCurrentChat(user: JwtPayload, chatId: string) {
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
            select: { userId: true, text: true, dataWrite: true },
          },
          particapants: {
            where: { userId: { not: user.id } },
            select: { userId: true },
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

  async createChat(user: JwtPayload, otherUser: CreateChatDto) {
    const currentIdUsers = [user.id, otherUser.userId];

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
            create: [{ userId: user.id }, { userId: otherUser.userId }],
          },
        },
      });

      return this.getCurrentChat(user, String(createChat.id));
    }

    return this.getCurrentChat(user, String(getChatParticapnts[0]?.id));
  }

  async deleteChat(user: JwtPayload, chatDto: DeleteChatDto) {
    const getUserParticipants = await this.prisma.participant.findMany({
      where: {
        chatId: Number(chatDto.chatId),
        userId: user.id,
      },
    });

    if (getUserParticipants.length === 0) {
      throw new HttpException(
        'У вас нет доступа к этому чату',
        HttpStatus.FORBIDDEN,
      );
    }

    const deleteChat = await this.prisma.chat.delete({
      where: { id: Number(chatDto.chatId) },
    });

    return deleteChat;
  }
}
