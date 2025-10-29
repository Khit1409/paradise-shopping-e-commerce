import { Body, Controller, Get, Put, Req, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserAccountDto } from "./dto/user-update.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * update user accounts
   * @param dto
   * @param req
   * @param res
   * @returns
   */
  @Put("")
  async updateUserAccount(
    @Body() dto: UpdateUserAccountDto,
    @Req() req,
    @Res() res
  ) {
    try {
      const { userId } = req.user;
      //service
      const result = await this.usersService.updateUserAccount(dto, userId);
      //response
      const { statusCode, message, resultCode } = result;
      return res.status(statusCode).json({ message, resultCode });
    } catch (error) {
      return res.status(500).json({ message: `${error}`, resultCode: 0 });
    }
  }
}
