import mongoose, { FilterQuery } from 'mongoose';
import { GetProductByQueryDto } from '@/dto/product/product-get.dto';
import { ProductDoc } from '@/schema/product.schema';
import {
  GetProductByQueryResponseDto,
  GetSingleProductResponseDto,
} from '@/modules/domain/dto/product/product-response-dto';
import { CreateNewProductDto } from '@/modules/domain/dto/product/product-create-dto';
import { GeneralHandleResponse } from './general.interface';
import { UpdateProductDto } from '@/modules/domain/dto/product/product-update.dto';

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
  /**
   * delete
   * @param id
   * @param seller_id
   */
  delete: (
    id: mongoose.Types.ObjectId,
    seller_id: string,
  ) => Promise<GeneralHandleResponse>;
  /**
   * stop sell product by id
   * @param seller_id
   * @param id
   * @returns
   */
  changeActive: (
    id: mongoose.Types.ObjectId,
    seller_id: string,
    active: boolean,
  ) => Promise<GeneralHandleResponse>;
  /**
   * update product
   * @param dto
   * @param seller_id
   */
  update: (
    dto: UpdateProductDto,
    seller_id: string,
  ) => Promise<GeneralHandleResponse>;
}
