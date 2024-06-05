import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { PrismaModule } from './config/database/prisma.module';
import { UserModule } from './service/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './service/auth/auth.module';
import { ChatModule } from './service/chat/chat.module';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './service/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
