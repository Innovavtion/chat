import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class FriendService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserFriends(userId: string) {
    const getUserFriends = await this.prisma.friend.findMany({
      where: {
        OR: [
          { userInviteId: userId, statusInvite: true },
          { AND: { userReceivingId: userId, statusInvite: true } },
        ],
      },
    });

    return getUserFriends;
  }

  async getUserInviteFriends(userId: string) {
    const getUserInviteFriends = await this.prisma.friend.findMany({
      where: { userInviteId: userId, statusInvite: false },
    });

    return getUserInviteFriends;
  }

  async getUserReceivingFriends(userId: string) {
    const getUserReceivingFriends = await this.prisma.friend.findMany({
      where: { userReceivingId: userId, statusInvite: false },
    });

    return getUserReceivingFriends;
  }

  async inviteUserInFriends(userId: string, friendId: string) {
    const getUsers = await this.prisma.user.findMany({
      where: { id: { in: [userId, friendId] } },
    });

    if (getUsers.length !== 2) {
      throw new HttpException(
        'Неверный id пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }

    const getUserInviteFriends = await this.prisma.friend.findMany({
      where: {
        userInviteId: userId,
        userReceivingId: friendId,
        statusInvite: false,
      },
    });

    if (getUserInviteFriends.length !== 0) {
      throw new HttpException(
        'Приглашение уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createUserInviteInFriends = await this.prisma.friend.create({
      data: {
        userInviteId: userId,
        userReceivingId: friendId,
        statusInvite: false,
      },
    });

    return createUserInviteInFriends;
  }

  async rejectionInviteInFriends(userId: string, friendId: string) {
    const getUsers = await this.prisma.user.findMany({
      where: { id: { in: [userId, friendId] } },
    });

    if (getUsers.length !== 2) {
      throw new HttpException(
        'Неверный id пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }

    const getUserInviteFriends = await this.prisma.friend.findMany({
      where: {
        userInviteId: userId,
        userReceivingId: friendId,
        statusInvite: false,
      },
    });

    if (getUserInviteFriends.length === 0) {
      throw new HttpException('Такого приглашения нет', HttpStatus.BAD_REQUEST);
    }

    const getIdInviteFriends = getUserInviteFriends.map((i) => i.id);

    const deleteUserInviteFriends = await this.prisma.friend.delete({
      where: {
        id: getIdInviteFriends[0],
        userInviteId: userId,
        userReceivingId: friendId,
        statusInvite: false,
      },
    });

    return deleteUserInviteFriends;
  }

  async rejectionReceivingInFriends(userId: string, friendId: string) {
    const getUsers = await this.prisma.user.findMany({
      where: { id: { in: [userId, friendId] } },
    });

    if (getUsers.length !== 2) {
      throw new HttpException(
        'Неверный id пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }

    const getUserReceivingFriends = await this.prisma.friend.findMany({
      where: {
        userInviteId: friendId,
        userReceivingId: userId,
        statusInvite: false,
      },
    });

    if (getUserReceivingFriends) {
      throw new HttpException('Такого приглашения нет', HttpStatus.BAD_REQUEST);
    }

    const getIdReceivingFriends = getUserReceivingFriends.map((i) => i.id);

    const deleteUserReceivingFriends = await this.prisma.friend.delete({
      where: {
        id: getIdReceivingFriends[0],
        userInviteId: friendId,
        userReceivingId: userId,
        statusInvite: false,
      },
    });

    return deleteUserReceivingFriends;
  }

  async deleteUserIsFriends(userId: string, friendId: string) {
    const getUsers = await this.prisma.user.findMany({
      where: { id: { in: [userId, friendId] } },
    });

    if (getUsers.length !== 2) {
      throw new HttpException(
        'Неверный id пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }

    const getUserFriends = await this.prisma.friend.findMany({
      where: {
        OR: [
          {
            userInviteId: userId,
            userReceivingId: friendId,
            statusInvite: true,
          },
          {
            AND: {
              userInviteId: friendId,
              userReceivingId: userId,
              statusInvite: true,
            },
          },
        ],
      },
    });

    if (getUserFriends.length == 0) {
      throw new HttpException(
        'У вас нет такого пользователя в списке друзей',
        HttpStatus.BAD_REQUEST,
      );
    }

    const getIdFriends = getUserFriends.map((i) => i.id);

    const deleteUserFriends = await this.prisma.friend.delete({
      where: {
        id: getIdFriends[0],
      },
    });

    return deleteUserFriends;
  }
}
