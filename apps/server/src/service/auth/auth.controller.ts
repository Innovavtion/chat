import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { Cookie, Public, UserAgent } from '../../common/decorators/';

import { Response } from 'express';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { ConfigService } from '@nestjs/config';

import { Tokens } from './interfaces/tokens.interface';

import { UserResponse } from './responses/user.response';

const REFRESH_TOKEN = 'refreshtoken';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);

    if (!user) {
      throw new BadRequestException(
        `Не получается зарегистрировать пользователя с данными ${JSON.stringify(registerDto)}`,
      );
    }

    return new UserResponse(user);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    const tokens = await this.authService.login(loginDto, agent);

    if (!tokens) {
      throw new BadRequestException(
        `Не получается войти с данными ${JSON.stringify(loginDto)}`,
      );
    }

    this.setRefreshTokenToCookies(tokens, res);
  }

  @Get('logout')
  async logout(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      res.sendStatus(HttpStatus.OK);
      return;
    }

    await this.authService.deleteRefreshTokens(refreshToken);

    res.cookie(REFRESH_TOKEN, '', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
    });

    res.sendStatus(HttpStatus.OK);
  }

  /*
  @Get('google')
  async googleAuth() {}
  */

  @Get('refresh')
  async refreshTokens(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const tokens = await this.authService.refreshTokens(refreshToken, agent);

    if (!tokens) {
      throw new UnauthorizedException();
    }

    this.setRefreshTokenToCookies(tokens, res);
  }

  private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }

    res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.exp),
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });

    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }
}
