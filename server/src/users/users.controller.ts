import { Body, Controller, Get, Put, Req, Res } from "@nestjs/common";
import { UsersService } from "./users.service";

import { UpdateUserAccountDto } from "./dto/user-update.dto";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}
  /**
   * update user accounts
   * @param dto
   * @param req
   * @param res
   * @returns
   */
  @Put("update_user_account")
  async updateUserAccount(
    @Body() dto: UpdateUserAccountDto,
    @Req() req,
    @Res() res
  ) {
    try {
      //service
      const result = await this.usersService.updateUserAccount(dto, req.userId);
      //response
      const { statusCode, message, resultCode } = result;
      return res.status(statusCode).json({ message, resultCode });
    } catch (error) {
      return res.status(500).json({ message: `${error}`, resultCode: 0 });
    }
  }
}
