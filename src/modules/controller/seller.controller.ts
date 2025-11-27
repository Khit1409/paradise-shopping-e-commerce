import type { JwtAuthGuardRequest } from '@/types/auth/auth.type';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import type {
  CreateNewProductRequest,
  GetProductByQueryRequest,
  UpdateProductRequest,
} from '@/types/product/product.type';
import { ProductMapper } from '../mapper/product.mapper';
import { OrderService } from '../services/order.service';
import type { GetOrderForSellerQuery } from '@/types/order/order.type';

@Controller('seller')
export class SellerController {
  constructor(
    private readonly producService: ProductService,
    private readonly orderService: OrderService,
  ) {}
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
   * @param req
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
  /**
   * update product by seller id controller
   * @param body
   * @param req
   */
  @Put('products')
  async updateProduct(
    @Body() body: UpdateProductRequest,
    @Req() req: JwtAuthGuardRequest,
  ) {
    const { id } = req.user;
    const formatedRequest = ProductMapper.formatUpdateProductRequest(body);
    return await this.producService.updateProduct(formatedRequest, id);
  }
  /**
   * delete product by id and seller id
   * @param id
   * @param req
   */
  @Delete('products/:id')
  async deleteProduct(
    @Param('id') product_id: string,
    @Req() req: JwtAuthGuardRequest,
  ) {
    const { id } = req.user;
    return await this.producService.deleteProduct(product_id, id);
  }
  /**
   * stop product active controller
   * @param product_id
   * @param req
   */
  @Patch('products/:id')
  async changeProductActive(
    @Param('id') product_id: string,
    @Body() body: { active: boolean },
    @Req() req: JwtAuthGuardRequest,
  ) {
    const { id } = req.user;
    return await this.producService.changeProductActive(
      product_id,
      id,
      body.active,
    );
  }
  /**
   * seller get order for manager page
   * @param req
   */
  @Get('orders')
  async getOrders(
    @Req() req: JwtAuthGuardRequest,
    @Query() query: GetOrderForSellerQuery,
  ) {
    const { id } = req.user;
    return await this.orderService.getForSeller(id, query);
  }
}
