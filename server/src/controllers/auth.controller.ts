import { UserLoginResponseDto } from '@/domains/dto/user/response-dto';
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * user login
   * @param data
   * @param res
   * @returns
   */
  @Post('login')
  async login(
    @Body() data: { role: 'user' | 'seller'; email: string; password: string },
    @Res() res: Response,
  ) {
    const { email, password, role } = data;
    const token = await this.authService.login(email, password);
    /**
     * send token to cookie
     */
    return res
      .cookie(`${role}_token`, token, {
        maxAge: 3600000 * 24,
        secure: false,
        sameSite: 'strict',
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'is logged in', resultCode: 1 });
  }
  /**
   * authentication user
   * @param req
   * @returns
   */
  @Get('me')
  authentication(@Req() req: { user: UserLoginResponseDto }) {
    return {
      ...req.user,
      userOtherEmail: [],
      userAddress: [],
      userOtherPhone: [],
    };
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
        .json({ message: 'success!', resultCode: 1 });
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
