import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class FriendService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUnfriends(userId: string) {
    const getUserFriends = await this.prisma.friend.findMany({
      where: {
        OR: [{ userInviteId: userId }, { AND: { userReceivingId: userId } }],
      },
      select: {
        userInvite: {
          select: {
            id: true,
            lastName: true,
            firstName: true,
            avatar: true,
            dataActive: true,
          },
        },
        userReceiving: {
          select: {
            id: true,
            lastName: true,
            firstName: true,
            avatar: true,
            dataActive: true,
          },
        },
      },
    });

    const getFriends = getUserFriends.map((e) => {
      if (e.userInvite.id === userId) {
        return e.userReceiving.id;
      } else if (e.userReceiving.id === userId) {
        return e.userInvite.id;
      }
    });

    const getUnfriends = await this.prisma.user.findMany({
      where: {
        NOT: { id: { in: [...getFriends.map((e) => e), userId] } },
      },
    });

    const getSortsFriends = getUnfriends.sort((a, b) =>
      a.firstName.localeCompare(b.firstName),
    );

    return getSortsFriends;
  }

  async getUserFriends(userId: string) {
    const getUserFriends = await this.prisma.friend.findMany({
      where: {
        OR: [
          { userInviteId: userId, statusInvite: true },
          { AND: { userReceivingId: userId, statusInvite: true } },
        ],
      },
      select: {
        userInvite: {
          select: {
            id: true,
            lastName: true,
            firstName: true,
            avatar: true,
            dataActive: true,
          },
        },
        userReceiving: {
          select: {
            id: true,
            lastName: true,
            firstName: true,
            avatar: true,
            dataActive: true,
          },
        },
      },
    });

    const getFriends = getUserFriends.map((e) => {
      if (e.userInvite.id === userId) {
        return e.userReceiving;
      } else if (e.userReceiving.id === userId) {
        return e.userInvite;
      }
    });

    const getSortsFriends = getFriends.sort((a, b) =>
      a.firstName.localeCompare(b.firstName),
    );

    return getSortsFriends;
  }

  async getUserInviteFriends(userId: string) {
    const getUserInviteFriends = await this.prisma.friend.findMany({
      where: { userInviteId: userId, statusInvite: false },
      select: {
        userReceiving: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            dataActive: true,
          },
        },
      },
    });

    const getInvite = getUserInviteFriends.map((e) => e.userReceiving);

    const getSortsInvite = getInvite.sort((a, b) =>
      a.firstName.localeCompare(b.firstName),
    );

    return getSortsInvite;
  }

  async getUserReceivingFriends(userId: string) {
    const getUserReceivingFriends = await this.prisma.friend.findMany({
      where: {
        userReceivingId: userId,
        statusInvite: false,
      },
      select: {
        userInvite: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            dataActive: true,
          },
        },
      },
    });

    const getFriends = getUserReceivingFriends.map((e) => e.userInvite);

    const getSortsFriends = getFriends.sort((a, b) =>
      a.firstName.localeCompare(b.firstName),
    );

    return getSortsFriends;
  }

  async acceptUserInFriends(userId: string, friendId: string) {
    const getUsers = await this.prisma.user.findMany({
      where: { id: { in: [userId, friendId] } },
    });

    if (getUsers.length !== 2) {
      throw new HttpException(
        'Неверный id пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }

    const getInvite = await this.prisma.friend.findMany({
      where: {
        userInviteId: friendId,
        userReceivingId: userId,
        statusInvite: false,
      },
    });

    if (getInvite.length !== 1) {
      throw new HttpException('Вы уже в друзьях', HttpStatus.BAD_REQUEST);
    }

    const idInvite = getInvite[0].id;

    const acceptUserFriends = await this.prisma.friend.update({
      where: {
        id: idInvite,
      },
      data: { statusInvite: true },
      select: {
        userInvite: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            dataActive: true,
          },
        },
      },
    });

    return acceptUserFriends;
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
      select: {
        userReceiving: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            dataActive: true,
          },
        },
      },
    });

    return createUserInviteInFriends.userReceiving;
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

    const getInvite = await this.prisma.friend.findMany({
      where: {
        userInviteId: friendId,
        userReceivingId: userId,
        statusInvite: false,
      },
    });

    if (getInvite.length !== 1) {
      throw new HttpException('Такого приглашения нет', HttpStatus.BAD_REQUEST);
    }

    const getIdInviteFriends = getInvite.map((i) => i.id);

    const deleteUserInviteFriends = await this.prisma.friend.delete({
      where: {
        id: getIdInviteFriends[0],
      },
      select: {
        userInvite: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            dataActive: true,
          },
        },
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
        userInviteId: userId,
        userReceivingId: friendId,
        statusInvite: false,
      },
    });

    if (getUserReceivingFriends.length === 0) {
      throw new HttpException('Такого приглашения нет', HttpStatus.BAD_REQUEST);
    }

    const getIdReceivingFriends = getUserReceivingFriends.map((i) => i.id);

    const deleteUserReceivingFriends = await this.prisma.friend.delete({
      where: {
        id: getIdReceivingFriends[0],
        userInviteId: userId,
        userReceivingId: friendId,
        statusInvite: false,
      },
      select: {
        userReceiving: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            dataActive: true,
          },
        },
      },
    });

    return deleteUserReceivingFriends.userReceiving;
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

    if (getUserFriends.length === 0) {
      throw new HttpException(
        'У вас нет такого пользователя в списке друзей',
        HttpStatus.BAD_REQUEST,
      );
    }

    const getIdFriends = getUserFriends[0].id;

    const deleteUserFriends = await this.prisma.friend.delete({
      where: {
        id: getIdFriends,
      },
      select: {
        userInvite: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            dataActive: true,
          },
        },
        userReceiving: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            dataActive: true,
          },
        },
      },
    });

    if (deleteUserFriends.userInvite.id === userId) {
      return deleteUserFriends.userReceiving;
    } else {
      return deleteUserFriends.userInvite;
    }
  }
}
