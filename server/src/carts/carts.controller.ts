import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Req,
} from "@nestjs/common";
import { CartsService } from "./carts.service";
import { AddToCartDto } from "./dto/cart-create.dto";
import { UsersService } from "src/users/users.service";
import { UpdateUserCartDto } from "./dto/cart-update.dto";

@Controller("carts")
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly userService: UsersService,
  ) {}

  /**
   * Add to cart controller
   * @param dto
   * @returns
   */
  @Post("add_to_cart")
  @HttpCode(200)
  async addToCartController(
    @Body() dto: AddToCartDto,
    @Req() req: { cookies: { user_token: string } },
  ) {
    try {
      const token = req.cookies.user_token;
      const user = await this.userService.authenticationUser(token);
      const userId = user.userId;
      const result = await this.cartsService.addToCartServicer(dto, userId);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * get cart by user id controller
   * @param dto
   * @returns
   */
  @Get("get_user_cart")
  @HttpCode(200)
  async getCartByUserIdController(
    @Req() req: { cookies: { user_token: string } },
  ) {
    try {
      const token = req.cookies.user_token;
      const user = await this.userService.authenticationUser(token);
      const userId = user.userId;
      const result = await this.cartsService.getCartByUserIdService(userId);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * delete user cart
   */
  @Delete("delete_user_cart/:id")
  @HttpCode(200)
  async deleteUserCartController(
    @Param("id") id: string,
    @Req()
    req: {
      cookies: {
        user_token: string;
        seller_token: string;
      };
    },
  ) {
    const token = req.cookies.user_token;
    const user = await this.userService.authenticationUser(token);
    if (!user) {
      throw new Error("User is not define!");
    }
    const result = await this.cartsService.deleteCartUserService(
      id,
      user.userId,
    );
    return result;
  }
  /**
   * update cart
   */
  @Put("update_user_cart")
  @HttpCode(200)
  async updateUserCartController(
    @Body() dto: UpdateUserCartDto,
    @Req() req: { cookies: { user_token: string } },
  ) {
    try {
      const token = req.cookies.user_token;
      const user = await this.userService.authenticationUser(token);
      const result = await this.cartsService.updateUserCart(dto, user.userId);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
