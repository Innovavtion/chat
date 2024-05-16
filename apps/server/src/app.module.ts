import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { PrismaModule } from './common/database/prisma.module';
import { UsersModule } from './service/users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    UsersModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
