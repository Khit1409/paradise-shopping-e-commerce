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
    /**
     * plublic path
     */
    const publictPath = ["/v1/auth/login", "/v1/auth/register"];
    /**
     * path
     */
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
    if (
      path.startsWith("/v1/auth/login") ||
      path.startsWith("/v1/auth/register") ||
      path.startsWith("/v1/images")
    ) {
      return true;
    }
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
