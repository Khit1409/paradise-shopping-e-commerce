import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.path as string;
    /**
     * true if is unneeded token router
     */
    let token: string | null = null;
    if (path.startsWith("/v1/seller") || path.startsWith("/v1/store")) {
      token = request.cookies?.seller_token;
    } else {
      token = request.cookies?.user_token;
    }

    const log = `
    ======================
    path is:${path}
    token is: ${token}
    ======================
    `;
    console.log(log);
    const { cookies, url, headers } = request;
    console.log({
      path,
      url,
      cookies,
      origin: headers.origin,
      referer: headers.referer,
    });
    if (!token) {
      throw new UnauthorizedException("Missing auth token!");
    }
    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      request.role = request.user.userRole;
      request.token = token;
      return true;
    } catch (error) {
      throw new UnauthorizedException(`${error}`);
    }
  }
}
