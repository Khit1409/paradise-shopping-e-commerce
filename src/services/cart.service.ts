import { CreateNewCartDto } from '@/domains/dto/cart/cart-create.dto';
import { UpdateCartDto } from '@/domains/dto/cart/cart-update.dto';
import { CartMongooRepository } from '@/infrastructure/database/mongoose/repositories/cart.mongoo.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  constructor(private cartRepo: CartMongooRepository) {}
  /**
   *
   * @param dto
   * @param user_id
   * @returns
   */
  async createNewCart(dto: CreateNewCartDto, user_id: string) {
    const result = await this.cartRepo.create(dto, user_id);
    if (!result) {
      return 0;
    }
    return 1;
  }
  /**
   *
   * @param user_id
   * @returns
   */
  async getCartList(user_id: string) {
    return await this.cartRepo.getByUserId(user_id);
  }
  /**
   *
   * @param id
   * @returns
   */
  async delete(id: string) {
    return await this.cartRepo.delete(id);
  }
  /**
   * @param id
   */
  async updatePatch(param: UpdateCartDto, user_id: string) {
    return await this.cartRepo.updatePatch(param, user_id);
  }
}
