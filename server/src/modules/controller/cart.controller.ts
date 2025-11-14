import { CartMapper } from '@/mapper/cart.mapper';
import { CartService } from '@/services/cart.service';
import type { JwtAuthGuardRequest } from '@/types/auth/auth.type';
import type {
  CreateNewCartRequest,
  UpdateCartRequest,
} from '@/types/cart/cart.type';

import {
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
    @Body() dto: CreateNewCartRequest,
    @Req() req: JwtAuthGuardRequest,
  ) {
    const formatedCartDto = CartMapper.formatRequestCreateNewCart(dto);
    const result = await this.cartService.createNewCart(
      formatedCartDto,
      req.user.id,
    );
    return result;
  }
  /**
   *
   * @param req
   * @returns
   */
  @Get()
  async getCart(@Req() req: JwtAuthGuardRequest) {
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
    return result;
  }
  /**
   *
   */
  @Patch('')
  async updatePatch(
    @Body() param: UpdateCartRequest,
    @Req() req: JwtAuthGuardRequest,
  ) {
    const { id } = req.user;
    const dto = CartMapper.formatCartUpdateRequest(param);
    const result = await this.cartService.updatePatch(dto, id);
    return result;
  }
}
