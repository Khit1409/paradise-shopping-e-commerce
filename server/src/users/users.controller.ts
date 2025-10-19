import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Put,
  Req,
  Res,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterDto } from "./dto/register.dto";
import { SignInDto } from "./dto/signin.dto";
import type { Request, Response } from "express";
import { UpdateUserAccountDto } from "./dto/user-update.dto";
// import { CreateStoreDto } from "src/store/dto/store.dto"/\;

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * register account
   * @param dto
   * @returns
   */
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    try {
      return this.usersService.registerUser(dto);
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * user login
   * @param res
   * @param credentials
   * @returns
   */
  @Post("login")
  async userLogin(
    @Res({ passthrough: true }) res: Response,
    @Body() credentials: SignInDto,
  ) {
    try {
      const tokenName = `${credentials.role}_token`;
      const token = await this.usersService.userSignIn(credentials);
      res.cookie(tokenName, token, {
        maxAge: 3600000 * 24,
        secure: false,
        sameSite: "strict",
        httpOnly: true,
      });
      return { message: "Login successful!", resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   *  authentication
   * @param req
   * @returns
   */
  @Get("auth/:role")
  async authentication(
    @Req()
    req: {
      cookies: {
        user_token: string;
        seller_token: string;
      };
      params: {
        role: "user" | "seller";
      };
    },
  ) {
    try {
      const role = req.params.role;
      const token =
        role === "user" ? req.cookies.user_token : req.cookies.seller_token;
      const result = await this.usersService.authenticationUser(token);
      return { message: "Xác thực thành công", auth: result };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }

  /**
   * logout
   * @param res
   */
  @Post("client_logout")
  logoutClient(@Res() res: Response) {
    res
      .clearCookie("user_token")
      .json({ message: "logout successful!", resultCode: 1 });
  }
  @Put("update_user_account")
  async updateUserAccount(
    @Body() dto: UpdateUserAccountDto,
    @Req() req: { cookies: { user_token: string } },
  ) {
    const token = req.cookies.user_token;
    const user = await this.usersService.authenticationUser(token);
    const userId = user.userId.toLowerCase();
    const result = await this.usersService.updateUserAccount(dto, userId);
    return result;
  }
  /**
   * test
   */
  @Get("test")
  test() {
    return this.usersService.testUser();
  }
}
