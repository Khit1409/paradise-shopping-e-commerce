import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from "@nestjs/common";
import { sellerProductService } from "./seller.product.service";
import { put } from "axios";
import { DeleteProductPartDto } from "./dto/delete-dto.dto";
import type { Response } from "express";
import { UpNewProductDto } from "./dto/create-dto.dto";
import { UpdateProductPartDto } from "./dto/update-dto.dto";

@Controller("/seller/products")
export class SellerProductController {
  constructor(private readonly sellerProductService: sellerProductService) {}
  @Get()
  async getAll(@Req() req) {
    const { userId } = req.user;
    return this.sellerProductService.getProducts(userId);
  }
  @Get(":id")
  async getSingle(@Req() req, @Param("id") id: string) {
    const { userId } = req.user;
    return this.sellerProductService.getSingleProduct(userId, id);
  }
  @Post()
  async newProduct(@Body() body: UpNewProductDto, @Req() req) {
    const { userId, userStore } = req.user;
    return this.sellerProductService.upNewProduct(body, userId, userStore);
  }
  @Put("/:id")
  async updateProduct(
    @Param("id") id: string,
    @Body()
    body: {
      updateValue: UpdateProductPartDto;
      deleteValue: DeleteProductPartDto;
    },
    @Req() req
  ) {
    const { userId, userStore } = req.user;
    const result = await this.sellerProductService.updateProduct(
      id,
      body,
      userStore,
      userId
    );
    return result;
  }
  @Delete(":id")
  async deleteProduct(@Param("id") id: string, @Req() req) {
    const { userId } = req.user;
    return this.sellerProductService.deleteProduct(id, userId);
  }
}
