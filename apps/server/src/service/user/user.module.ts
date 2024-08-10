import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [AvatarModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
