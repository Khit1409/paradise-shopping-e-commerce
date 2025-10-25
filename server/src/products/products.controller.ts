import { Controller, Get, Query, Res } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { GetProductDto, getSingleProductDto } from "./dto/product.dto";
import type { Response } from "express";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  /**
   * Get product for home page preview
   * @param dto
   * @param res
   * @returns
   */
  @Get("get_home_product")
  async getHomeProductController(
    @Query() dto: { page: number },
    @Res() res: Response
  ) {
    const data = await this.productsService.getHomeProductService(dto);
    const { api, message, resultCode, statusCode } = data;
    return res.status(statusCode).json({ message, api, resultCode });
  }
  /**
   * get product for shop page preview
   * @param dto
   * @returns
   */
  @Get("get_product_shop")
  async getProductShopController(
    @Query() dto: GetProductDto,
    @Res() res: Response
  ) {
    const result = await this.productsService.getProductShopService(dto);
    const { message, resultCode, statusCode, api } = result;
    return res.status(statusCode).json({ message, resultCode, api });
  }
  /**
   * get single product for single product page
   * @param dto
   * @returns
   */
  @Get("get_single_product")
  async getSingleProductController(
    @Query() dto: getSingleProductDto,
    @Res() res: Response
  ) {
    const result = await this.productsService.getSingleProductService(dto);
    const { message, resultCode, statusCode, api } = result;
    return res.status(statusCode).json({ message, resultCode, api });
  }
}
