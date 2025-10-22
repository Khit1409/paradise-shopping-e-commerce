import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import {
  DeleteActionSingleProductDto,
  GetProductDto,
  getSingleProductDto,
  UpdateSingleProductDto,
} from "./dto/product.dto";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./models/product.model";
import { UsersService } from "src/users/users.service";
import type { Response } from "express";

@Controller("products")
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly userService: UsersService,
    @InjectModel("Product") private readonly productModel: Model<Product>
  ) {}
  @Get("get_home_product")
  async getHomeProductController(
    @Query() dto: { page: number },
    @Res() res: Response
  ) {
    const data = await this.productsService.getHomeProductService(dto);
    const { api, message, resultCode, statusCode } = data;
    return res.status(statusCode).json({ message, api, resultCode });
  }
  @Get("get_product_shop")
  @HttpCode(200)
  async getProductShopController(@Query() dto: GetProductDto) {
    const result = await this.productsService.getProductShopService(dto);
    return result;
  }
  @Get("get_single_product")
  @HttpCode(200)
  async getSingleProductController(@Query() dto: getSingleProductDto) {
    return this.productsService.getSingleProductService(dto);
  }
  @Post("update_product_single")
  @HttpCode(200)
  async updateSingleProductController(
    @Body() dto: UpdateSingleProductDto,
    @Req() req: { cookies: { seller_token: string } }
  ) {
    const token = req.cookies.seller_token;
    const user = await this.userService.authenticationUser(token);
    const sellerId = user.userId;

    const storeId = user.userStore;
    if (!storeId) {
      throw new BadRequestException(
        "Error when authentication get user store id!"
      );
    }
    return this.productsService.updateSingleProductService(
      dto,
      storeId,
      sellerId
    );
  }
  //
  @Post("delete_action_single_product")
  @HttpCode(200)
  async deleteActionSingleProductController(
    @Body() dto: DeleteActionSingleProductDto,
    @Req() req: { cookies: { seller_token: string } }
  ) {
    const token = req.cookies.seller_token;
    const user = await this.userService.authenticationUser(token);
    if (!user) {
      throw new BadRequestException("Wrong seller!");
    }
    const sellerId = user.userId;
    return this.productsService.deleteActionSingleProductService(dto, sellerId);
  }
  @Delete("delete_single_product/:id")
  @HttpCode(200)
  async deleteSingleProductController(
    @Param("id") id: string,
    @Req() req: { cookies: { seller_token: string } }
  ) {
    try {
      const token = req.cookies.seller_token;
      const user = await this.userService.authenticationUser(token);
      if (!user) {
        throw new BadRequestException("Wrong seller!");
      }
      const proId = new mongoose.Types.ObjectId(id);
      await this.productModel.deleteOne({ _id: proId, sellerId: user.userId });
      return { message: "Successfull", resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  @Post("up_product_test")
  @HttpCode(200)
  async testProduct(
    @Body()
    data: {
      proCateSlug: string;
      proName: string;
      proTag: string;
      storeId: string;
      sellerId: string;
      proSlug: string;
      proPrice: number;
      proSale: number;
      proImg: string;
      proDescription: string;
      proAttributes: {
        attrName: string;
        items: { itemValue: string; itemImg: string }[];
      }[];
      proImgDetails: {
        imgUrl: string;
      }[];
    }[]
  ) {
    const sellerId = "40a925fa-dab6-43f3-b81b-d0a93e9a2346";

    const storeId = "29c90ac7-34af-4116-8de2-4a18ebad81ba";
    if (!storeId) {
      throw new BadRequestException(
        "Error when authentication get user store id!"
      );
    }
    return this.productsService.tesfunction(data, sellerId, storeId);
  }
}
