import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { JwtAuthGuardRequest } from '@/types/auth/auth.type';
import { JwtVerifyDto } from '@/domain/dto/auth/authentication.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configSerivice: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const switchToHttp = context.switchToHttp();
    const request = switchToHttp.getRequest<Request & JwtAuthGuardRequest>();
    /**
     * plublic path
     */
    const publictPath = [
      '/v1/auth/login',
      '/v1/auth/register',
      '/v1/auth/login',
      '/v1/auth/register',
      '/v1/imgs',
      '/v1/app',
      '/v1/products',
      '/v1/ui',
      '/v1/payments',
    ];
    /**
     * path
     */
    const path = request.path;
    const foundPublicUrl = publictPath.find((item) => path.startsWith(item));
    if (foundPublicUrl) {
      return true;
    }
    /**
     * true if is unneeded token router
     */
    let token: string | null = null;
    if (path.startsWith('/v1/seller') || path.startsWith('/v1/store')) {
      token = request.cookies.seller_token;
    } else {
      token = request.cookies.user_token;
    }

    if (!token) {
      throw new UnauthorizedException('Missing auth token!');
    }
    try {
      const payload: JwtVerifyDto = this.jwtService.verify(token, {
        secret: this.configSerivice.get<string>('JWT_SECRET'),
      });
      /**
       * format user data payload
       */
      request.user = {
        id: payload.id.toLowerCase(),
        avatar: payload.avatar,
        firtname: payload.firtname,
        fullname: payload.fullname,
        lastname: payload.lastname,
        store_id: payload.store_id.toLowerCase(),
        role: payload.role,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        created_at: payload.created_at,
      };
      request.token = token;
      return true;
    } catch (error) {
      throw new UnauthorizedException(`${error}`);
    }
  }
}
