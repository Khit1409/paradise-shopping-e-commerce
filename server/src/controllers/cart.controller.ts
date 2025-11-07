import { CreateNewCartDto } from '@/domains/dto/cart/cart-create.dto';
import { UpdateCartDto } from '@/domains/dto/cart/cart-update.dto';
import { UserLoginResponseDto } from '@/domains/dto/user/response-dto';
import { CartService } from '@/services/cart.service';
import type { JwtAuthGuardRequestType } from '@/types/auth.interface';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  /**
   *
   * @param dto
   * @param req
   * @returns
   */
  @Post('')
  async createNew(
    @Body() dto: CreateNewCartDto,
    @Req() req: { user: UserLoginResponseDto },
  ) {
    const result = await this.cartService.createNewCart(dto, req.user.id);
    if (result !== 1) {
      throw new BadRequestException('cart is not added!');
    }
    return { message: 'Success!', resultCode: 1 };
  }
  /**
   *
   * @param req
   * @returns
   */
  @Get()
  async getCart(@Req() req: { user: UserLoginResponseDto }) {
    return await this.cartService.getCartList(req.user.id);
  }
  /**
   * delete cart by id
   * @param id
   * @returns
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.cartService.delete(id);
    if (result == 0) {
      throw new BadRequestException('Error delete cart!');
    }
    return { message: 'Success!', resultCode: 1 };
  }
  /**
   *
   */
  @Patch('')
  async updatePatch(
    @Body() param: UpdateCartDto,
    @Req() req: JwtAuthGuardRequestType,
  ) {
    const { id } = req.user;
    const result = await this.cartService.updatePatch(param, id);
    if (result !== 1) {
      throw new BadRequestException('update cart failed!');
    }
    return { message: 'Success!', statusCode: 1 };
  }
}
