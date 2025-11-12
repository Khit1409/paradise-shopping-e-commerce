import { GetProductByQueryDto } from '@/domain/dto/product/product-get.dto';
import { ProductMongooRepository } from '@/modules/domain/repositories/produc.repository';
import { Injectable } from '@nestjs/common';
import { CreateNewProductDto } from '../domain/dto/product/product-create-dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductMongooRepository) {}

  /**
   * Get product list
   * @param dto
   * @param seller_id
   * @param store_id
   * @returns
   */
  async getProductList(
    dto: GetProductByQueryDto,
    seller_id?: string,
    store_id?: string,
  ) {
    return await this.productRepo.getProductList(dto, seller_id, store_id);
  }
  /**
   * Get single product
   * @param id
   * @param seller_id
   * @returns
   */
  async getSingleProductById(id: string, seller_id?: string) {
    return await this.productRepo.getSingleProduct(id, seller_id);
  }
  /**
   * Create new product service
   * @param dto
   * @returns
   */
  async createNewProduct(dto: CreateNewProductDto) {
    return await this.productRepo.create(dto);
  }
}
