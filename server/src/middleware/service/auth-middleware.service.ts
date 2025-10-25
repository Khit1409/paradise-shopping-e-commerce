import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request, Response } from "express";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthMiddlewareService {
  constructor(private readonly authService: AuthService) {}
  /**
   * verify token
   * @param req
   * @param res
   */
  async verifytoken(req: Request, res: Response) {
    /**
     * role
     */
    let role: "user" | "seller" | null = null;
    let tokenName: "user_token" | "seller_token" | null = null;
    /**
     * /seller
     * /user
     * /admin
     */
    const routerUrl = req.baseUrl;
    console.log(routerUrl);
    //set value with condition
    if (routerUrl.startsWith("/v1/seller")) {
      role = "seller";
      tokenName = "seller_token";
    } else if (routerUrl.startsWith("/v1/users")) {
      role = "user";
      tokenName = "user_token";
    }
    // get token value by role
    const token =
      role === "seller" ? req.cookies.seller_token : req.cookies.user_token;
    if (!token) {
      throw new UnauthorizedException(`Missing ${role ?? "user"} token!`);
    }
    // verify token
    const info = await this.authService.authentication(token);
    //return req for controller
    const { userId } = info.api;
    req["role"] = role;
    req["userId"] = userId;
    req["userInfo"] = info.api;
    //final result
    return info;
  }
}
