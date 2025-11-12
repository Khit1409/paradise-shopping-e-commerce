import { CreateNewCartDto } from '@/domain/dto/cart/cart-create.dto';
import { CartResponseDto } from '@/domain/dto/cart/cart-response.dto';
import { UpdateCartDto } from '@/domain/dto/cart/cart-update.dto';
import {
  CartListFinishedHandle,
  CreateNewCartRequest,
  UpdateCartRequest,
} from '@/types/cart/cart.type';
import mongoose from 'mongoose';

export class CartMapper {
  /**
   * Format creat new cart request from client to dto for using
   * in service.
   * @param request
   * @returns
   */
  static formatRequestCreateNewCart(
    request: CreateNewCartRequest,
  ): CreateNewCartDto {
    return new CreateNewCartDto({
      info: {
        name: request.info.name,
        slug: request.info.slug,
        product_id: new mongoose.Types.ObjectId(request.info.product_id),
      },
      original_price: request.original_price,
      quantity: request.quantity,
      thumbnail: request.thumbnail,
      total_price: request.total_price,
      varitants: request.varitants,
    });
  }
  /**
   * Format cart data when finished handle to type of api dto
   * cart response.
   * @param response
   * @returns
   */
  static formatCartResponse(
    response: CartListFinishedHandle[],
  ): CartResponseDto[] {
    return response.map(
      (res) =>
        new CartResponseDto({
          id: res._id.toString(),
          info: {
            name: res.info.name,
            product_id: res.info.product_id,
            slug: res.info.slug,
          },
          original_price: res.original_price,
          quantity: res.quantity,
          thumbnail: res.thumbnail,
          total_price: res.total_price,
          varitants: res.varitants,
        }),
    );
  }
  /**
   * Format cart update request to cart update of dto
   */
  static formatCartUpdateRequest(request: UpdateCartRequest): UpdateCartDto {
    return new UpdateCartDto({
      id: new mongoose.Types.ObjectId(request.id),
      quantity: Number(request.quantity),
      varitants: {
        sku: request.varitants.sku,
        attributes: request.varitants.attributes,
      },
    });
  }
}
