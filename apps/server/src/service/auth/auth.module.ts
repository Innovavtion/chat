import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { GUARDS } from './guards/';
import { STRATAGIES } from './stratagies/';

import { HttpModule } from '@nestjs/axios';

import { options } from './config/';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ...GUARDS, ...STRATAGIES],
  imports: [PassportModule, JwtModule.registerAsync(options()), HttpModule],
})
export class AuthModule {}
