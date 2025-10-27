import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Request, Response } from "express";
import { RegisterDto } from "./dto/auth-register.dto";

/**
 * router url: http://localhost:8000/v1/auth
 */

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * sign in with role seller or user
   * send cookie
   * @param body
   * @param res
   * @returns
   */
  @Post("login")
  async signIn(
    @Body() body: { email: string; password: string; role: "seller" | "user" },
    @Res() res: Response
  ) {
    const { email, password, role } = body;
    const result = await this.authService.signInService(
      email,
      password,
      role,
      res
    );
    const { statusCode, message, resultCode } = result;
    return res.status(statusCode).json({ message, resultCode });
  }
  /**
   * authentication by auth middle ware
   * @param req
   * @param res
   * @returns {string,number,UserDataType}
   */
  @Get("me")
  async auth(
    @Req() req,
    @Res() res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const { userRole } = req.user;
      return res
        .status(200)
        .json({ message: userRole, api: req.user, resultCode: 1 });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Authentication fail!", api: null, resultCode: 0 });
    }
  }
  /**
   * register new account
   * @param body
   * @param res
   * @returns
   */
  @Post("register")
  async registerAccount(
    @Body() body: RegisterDto,
    @Res() res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const result = await this.authService.registerService(body);
    const { statusCode, message, resultCode } = result;
    return res.status(statusCode).json({ message, resultCode });
  }
  /**
   * logout and clear token on cookie
   * @param req
   */
  @Post("client_logout")
  logout(
    @Req() req: Request,
    @Res() res: Response
  ): Response<any, Record<string, any>> {
    const usertoken = req.cookies.user_token;
    if (usertoken) {
      return res
        .clearCookie("user_token")
        .status(200)
        .json({ message: "user is logout!", resultCode: 1 });
    }
    return res
      .clearCookie("seller_token")
      .status(200)
      .json({ message: "user is logout!", resultCode: 1 });
  }
  /**
   * test function
   */
  @Get()
  async getTest(@Req() req) {
    return this.authService.testVerify();
  }
}
