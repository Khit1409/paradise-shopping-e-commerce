import { GetProductByQueryDto } from '@/domain/dto/product/product-get.dto';
import { ProductMongooRepository } from '@/modules/domain/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { CreateNewProductDto } from '../domain/dto/product/product-create-dto';
import { UpdateProductDto } from '../domain/dto/product/product-update.dto';
import mongoose from 'mongoose';

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
  /**
   * update product
   * @param dto
   * @param seller_id
   */
  async updateProduct(dto: UpdateProductDto, seller_id: string) {
    return await this.productRepo.update(dto, seller_id);
  }
  /**
   * delete product
   * @param id
   * @param seller_id
   */
  async deleteProduct(id: string, seller_id: string) {
    const product_id = new mongoose.Types.ObjectId(id);
    return await this.productRepo.delete(product_id, seller_id);
  }
  /**
   * stop product active by id
   * @param id
   * @param seller_id
   */
  async changeProductActive(id: string, seller_id: string, active: boolean) {
    const product_id = new mongoose.Types.ObjectId(id);
    return await this.productRepo.changeActive(product_id, seller_id, active);
  }
}
