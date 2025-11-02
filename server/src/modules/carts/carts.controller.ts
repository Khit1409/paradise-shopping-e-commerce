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
import { UsersService } from"@/modules/users/users.service";
import { UpdateUserCartDto } from "./dto/cart-update.dto";

@Controller("carts")
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly userService: UsersService
  ) {}

  /**
   * Add to cart controller
   * @param dto
   * @returns
   */
  @Post("")
  @HttpCode(200)
  async addToCart(@Body() dto: AddToCartDto, @Req() req) {
    try {
      const { userId } = req.user;
      const result = await this.cartsService.addToCart(dto, userId);
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
  @Get("")
  async getCartByUserId(@Req() req) {
    try {
      const { userId } = req.user;
      const result = await this.cartsService.getCartByUserId(userId);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * delete user cart
   */
  @Delete("/:id")
  @HttpCode(200)
  async deleteUserCart(
    @Param("id") id: string,
    @Req()
    req
  ) {
    const userData = req.user;
    const { userId } = userData;
    const result = await this.cartsService.deleteUserCart(id, userId);
    return result;
  }
  /**
   * update cart
   */
  @Put("")
  @HttpCode(200)
  async updateUserCart(@Body() dto: UpdateUserCartDto, @Req() req) {
    try {
      const { userId } = req.user;
      const result = await this.cartsService.updateUserCart(dto, userId);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
