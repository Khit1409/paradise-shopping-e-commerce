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
    @Query()
    query: {
      page: number;
      minPrice: number;
      maxPrice?: number;
      category?: string;
      area?: string;
      minSale: number;
      maxSale?: number;
    },
    @Res() res: Response
  ) {
    try {
      const api = await this.productsService.getProductPreview(query);
      return res
        .status(200)
        .json({ message: "successful!", api, resultCode: 1 });
    } catch (error) {
      return res.status(500).json({ message: `${error}`, resultCode: 0 });
    }
  }
  /**
   * get product for shop page preview
   * @param dto
   * @returns
   */
  @Get("get_product_shop")
  async getProductShopController(
    @Query()
    query: {
      page: number;
      minPrice: number;
      maxPrice?: number;
      category?: string;
      area?: string;
      minSale: number;
      maxSale?: number;
    },
    @Res() res: Response
  ) {
    try {
      console.log(query);
      const api = await this.productsService.getProductPreview(query);
      return res
        .status(200)
        .json({ message: "successful!", api, resultCode: 1 });
    } catch (error) {
      return res.status(500).json({ message: `${error}`, resultCode: 0 });
    }
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
