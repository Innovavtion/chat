import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { extname, join } from 'path';
import { PrismaService } from 'src/config/database/prisma.service';
import { JwtPayload } from 'src/service/auth/interfaces/tokens.interface';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AvatarService {
  constructor(private readonly prisma: PrismaService) {}

  private async getUser(user: JwtPayload) {
    const getUser = await this.prisma.user.findMany({
      where: { id: user.id },
    });

    if (!getUser) {
      throw new HttpException(
        'Такого пользователя нет',
        HttpStatus.BAD_REQUEST,
      );
    }

    return getUser[0];
  }

  private async deleteCurrentAvatar(avatar: string) {
    const currentAvatar = join(process.cwd(), '/uploads/avatar/' + avatar);

    if (fs.existsSync(currentAvatar)) {
      fs.rm(`${process.cwd()}/uploads/avatar/${avatar}`, () => {});
    }

    return currentAvatar;
  }

  private async addCurrentAvatar(file: Express.Multer.File) {
    const uploadDir = path.join(process.cwd(), '/uploads/avatar/');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${uuid()}${extname(file.originalname)}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, file.buffer);

    return fileName;
  }

  async uploadAvatar(user: JwtPayload, file: Express.Multer.File) {
    const getUser = await this.getUser(user);
    this.deleteCurrentAvatar(getUser.avatar);
    const newImage = await this.addCurrentAvatar(file);

    const updateAvatarUser = this.prisma.user.update({
      where: { id: user.id },
      data: { avatar: newImage },
      select: { id: true, avatar: true },
    });

    return updateAvatarUser;
  }

  async getAvatar(filename: string) {
    const file = join(process.cwd(), '/uploads/avatar/' + filename);

    if (fs.existsSync(file)) {
      const imageStream = createReadStream(file);
      return new StreamableFile(imageStream, { type: 'image/png' });
    } else {
      return null;
    }
  }
}
