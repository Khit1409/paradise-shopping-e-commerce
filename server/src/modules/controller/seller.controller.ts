import type { JwtAuthGuardRequest } from '@/types/auth/auth.type';
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import type {
  CreateNewProductRequest,
  GetProductByQueryRequest,
} from '@/types/product/product.type';
import { ProductMapper } from '../mapper/product.mapper';

@Controller('seller')
export class SellerController {
  constructor(private readonly producService: ProductService) {}
  /**
   *  Get product list for seller dashboard or store manager product container
   * @param query
   * @param req
   * @returns
   */
  @Get('products')
  async getProductOfSeller(
    @Query() query: GetProductByQueryRequest,
    @Req() req: JwtAuthGuardRequest,
  ) {
    const { id, store_id } = req.user;
    const dto = ProductMapper.formatGetProductRequest(query);
    return await this.producService.getProductList(dto, id, store_id);
  }
  @Get('products/:id')
  async getSingleProductOfSeller(
    @Param('id') product_id: string,
    @Req() req: JwtAuthGuardRequest,
  ) {
    const { id } = req.user;
    return await this.producService.getSingleProductById(product_id, id);
  }
  /**
   * create new product controller
   * @param body
   */
  @Post('products')
  async createProduct(
    @Body() body: CreateNewProductRequest,
    @Req() req: JwtAuthGuardRequest,
  ) {
    const { id, store_id } = req.user;
    console.log(body);
    const formatedDto = ProductMapper.formatCreateNewProductRequest(
      body,
      id,
      store_id,
    );
    return await this.producService.createNewProduct(formatedDto);
  }
}
