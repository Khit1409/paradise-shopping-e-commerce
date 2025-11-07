import { CartDoc } from '@/infrastructure/database/mongoose/schemas/cart.schema';
import { CreateNewCartDto } from '../dto/cart/cart-create.dto';
import { UpdateCartDto } from '../dto/cart/cart-update.dto';
/**
 * interface of cart mongoose repository function
 */
export interface ICartRepository {
  updatePatch: (param: UpdateCartDto, user_id: string) => Promise<number>;
  create: (dto: CreateNewCartDto, user_id: string) => Promise<CartDoc>;
  getByUserId: (id: string) => Promise<CartDoc[]>;
  delete: (id: string) => Promise<number>;
}
