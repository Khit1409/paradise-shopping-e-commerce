import { Body, Controller, Get, Post, Put, Req, Res } from "@nestjs/common";
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
      const { userRole, userId } = req.user;
      const infor = await this.authService.getUserInformation(userId);
      const data = {
        ...req.user,
        ...infor,
      };
      return res
        .status(200)
        .json({ message: userRole, api: data, resultCode: 1 });
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
  @Put("logout")
  logout(
    @Body() body: { role: "user" | "seller" },
    @Res() res: Response
  ): Response<any, Record<string, any>> {
    try {
      const { role } = body;
      return res
        .clearCookie(`${role}_token`)
        .status(200)
        .json({ message: `${role} is logout!`, resultCode: 1 });
    } catch (error) {
      return res.status(500).json({ message: `${error}`, resulCode: 0 });
    }
  }
  /**
   * test function
   */
  @Get()
  async getTest(@Req() req) {
    return this.authService.testVerify();
  }
}
