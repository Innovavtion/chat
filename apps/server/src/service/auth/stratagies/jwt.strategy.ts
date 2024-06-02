import { JwtPayload } from '../interfaces/tokens.interface';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@packages/database';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/config/database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user: User = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: payload.id }, { email: payload.email }],
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
