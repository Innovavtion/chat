import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/service/auth/interfaces/tokens.interface';
import { FileInterceptor } from '@nestjs/platform-express';

import { Public } from 'src/common/decorators';

@Controller('user/avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatarUser(
    @CurrentUser() user: JwtPayload,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: /(jpeg|jpg|png)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.avatarService.uploadAvatar(user, file);
  }

  @Public()
  @Get(':file')
  async getAvatarUser(@Param('file') filename: string) {
    return this.avatarService.getAvatar(filename);
  }
}
