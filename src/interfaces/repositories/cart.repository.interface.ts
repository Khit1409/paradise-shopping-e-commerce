import { CreateNewCartDto } from '@/dto/cart/cart-create.dto';
import { UpdateCartDto } from '@/dto/cart/cart-update.dto';
import { CartResponseDto } from '@/dto/cart/cart-response.dto';
import { GeneralHandleResponse } from './general.interface';
/**
 * interface of cart mongoose repository function
 */
export interface ICartRepository {
  updatePatch: (
    param: UpdateCartDto,
    user_id: string,
  ) => Promise<GeneralHandleResponse>;
  create: (
    dto: CreateNewCartDto,
    user_id: string,
  ) => Promise<GeneralHandleResponse>;
  getByUserId: (id: string) => Promise<CartResponseDto[]>;
  delete: (id: string) => Promise<GeneralHandleResponse>;
}
