import { FilterQuery } from 'mongoose';
import { GetProductByQueryDto } from '@/dto/product/product-get.dto';
import { ProductDoc } from '@/schema/product.schema';
import {
  GetProductByQueryResponseDto,
  GetSingleProductResponseDto,
} from '@/modules/domain/dto/product/product-response-dto';
import { CreateNewProductDto } from '@/modules/domain/dto/product/product-create-dto';
import { GeneralHandleResponse } from './general.interface';

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
  getSingleProduct: (
    id: string,
    seller_id?: string,
  ) => Promise<GetSingleProductResponseDto | null>;
  /**
   * Create new product repository
   * @param dto
   * @returns
   */
  create: (dto: CreateNewProductDto) => Promise<GeneralHandleResponse>;
}
