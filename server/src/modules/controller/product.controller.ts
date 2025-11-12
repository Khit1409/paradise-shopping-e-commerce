import { ProductMapper } from '@/mapper/product.mapper';
import { ProductService } from '@/services/product.service';
import type { GetProductByQueryRequest } from '@/types/product/product.type';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  /**
   * Get product list controller
   * @param dto
   * @returns
   */
  @Get('')
  async getProductList(@Query() dto: GetProductByQueryRequest) {
    const queryFormated = ProductMapper.formatGetProductRequest(dto);
    return await this.productService.getProductList(queryFormated);
  }
  /**
   * Get single product
   * @param id
   * @returns
   */
  @Get(':id')
  async getSingleProduct(@Param('id') id: string) {
    return await this.productService.getSingleProductById(id);
  }
}
