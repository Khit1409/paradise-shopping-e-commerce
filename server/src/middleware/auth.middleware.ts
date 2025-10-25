import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";
import { AuthMiddlewareService } from "./service/auth-middleware.service";

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  constructor(private readonly authService: AuthMiddlewareService) {}

  /**
   * Middelware authentication verify token
   * @param req
   * @param res
   * @param next
   */
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      /**
       * router unneed token
       */
      const routerPublic = ["/login", "/client_logout", "/register"];

      if (routerPublic.includes(req.path)) {
        return next();
      }
      await this.authService.verifytoken(req, res);
      next();
    } catch (err) {
      throw new UnauthorizedException(`${err}`);
    }
  }
}
