import { GetProductByQueryDto } from '@/domains/dto/product/product-get.dto';
import { ProductService } from '@/services/product.service';
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
  async getProductList(@Query() dto: GetProductByQueryDto) {
    return await this.productService.getProductList(dto);
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
