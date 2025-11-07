import { FilterQuery } from 'mongoose';
import { GetProductByQueryDto } from '../dto/product/product-get.dto';
import { ProductDoc } from '@/infrastructure/database/mongoose/schemas/product.schema';
import { GetProductByQueryResponseDto } from '../dto/product/product-response';

export interface IProductRepository {
  /**
   * Format query from request url
   * @param dto
   * @returns
   */
  createQuery: (dto: GetProductByQueryDto) => Promise<{
    limit: number;
    skip: number;
    query: FilterQuery<ProductDoc>;
  }>;
  /**
   * using query formated and get product list from data
   * @param dto
   * @returns
   */
  getProductList: (
    dto: GetProductByQueryDto,
  ) => Promise<GetProductByQueryResponseDto[]>;
  /**
   * get single product by product id and seller_id if is seller
   * @param id
   * @param seller_id
   * @returns
   */
  getSingleProduct: (id: string, seller_id?: string) => Promise<ProductDoc>;
}
