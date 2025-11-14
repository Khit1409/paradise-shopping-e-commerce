import { AuthService } from '@/services/auth.service';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import type { JwtAuthGuardRequest } from '@/types/auth/auth.type';
import type { UserRegisterRequest } from '@/types/user/user.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * user login
   * @param body
   * @param res
   * @returns
   */
  @Post('login')
  async login(
    @Body() body: { role: 'user' | 'seller'; email: string; password: string },
    @Res() res: Response,
  ) {
    const token = await this.authService.login(body);
    /**
     * send token to cookie
     */
    return res
      .cookie(`${body.role}_token`, token, {
        maxAge: 3600000 * 24,
        secure: false,
        sameSite: 'strict',
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'is loggedin', error: null, success: true });
  }
  /**
   * authentication user
   * @param req
   * @returns
   */
  @Get('me/:role')
  authentication(
    @Param('role') role: 'seller' | 'user',
    @Req() req: JwtAuthGuardRequest,
  ) {
    return req.user;
  }
  /**
   * logout
   * @param req
   */
  @Put('logout/:role')
  logout(@Param('role') role: 'user' | 'seller', @Res() res: Response) {
    try {
      return res
        .clearCookie(`${role}_token`)
        .status(200)
        .json({ message: 'success!', success: true, error: null });
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * register
   */
  @Post('register')
  register(@Body() body: UserRegisterRequest) {
    return this.authService.register(body);
  }
}
