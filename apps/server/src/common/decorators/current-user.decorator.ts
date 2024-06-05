import { ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../service/auth/interfaces/tokens.interface';
import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (
    key: keyof JwtPayload,
    ctx: ExecutionContext,
  ): JwtPayload | Partial<JwtPayload> => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.user[key] : request.user;
  },
);
