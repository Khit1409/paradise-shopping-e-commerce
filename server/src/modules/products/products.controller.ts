import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
  Res,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
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
  @Get("")
  async getProducts(
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
      const api = await this.productsService.getProducts(query);
      return res
        .status(200)
        .json({ message: "successful!", api, resultCode: 1 });
    } catch (error) {
      return res.status(500).json({ message: `${error}`, resultCode: 0 });
    }
  }
  /**
   * get single product for single product page
   * @param id
   * @returns
   */
  @Get("/:id")
  async getSingleProduct(@Param("id") id: string) {
    try {
      const result = await this.productsService.getSingleProduct(id);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
