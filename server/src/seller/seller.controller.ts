import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { SellerService } from "./seller.service";
import { StoreService } from "src/store/store.service";
import { UpNewProductDto } from "src/store/dto/store-create-new-product.dto";
import { UpdateSingleProductDto } from "src/store/dto/store-update-product.dto";
import mongoose, { Model } from "mongoose";
import type { Request, Response } from "express";
import { DeleteActionSingleProductDto } from "src/store/dto/store-delete-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "src/products/models/product.model";

@Controller("seller")
export class SellerController {
  constructor(
    @InjectModel("Product") private readonly productModel: Model<Product>,
    private readonly sellerService: SellerService,
    private readonly storeService: StoreService
  ) {}

  /**
   * ===============
   * PRODUCT MANAGER
   * ===============
   */
  /**
   * get all product in store for seller or manager store
   * @param query
   * @param req
   * @return {ProductSellerDataType}
   */
  @Get("get_product_seller")
  async getProductseller(@Query() query: { cate_slug: string }, @Req() req) {
    const { userId } = req.user;
    const result = await this.storeService.getProductSellerService(
      query,
      userId
    );
    return result;
  }
  /**
   * get single product for update product information
   * @param query product_id
   */
  @Get("get_single_product_seller")
  async getSingleProductSeller(@Query("product_id") query: string, @Req() req) {
    const { userId } = req.user;

    const result = await this.storeService.getSingleProductSellerService(
      query,
      userId
    );

    return result;
  }
  /**
   * up new product to store
   * @param dto
   * @param req
   * @returns
   */
  @Post("up_new_product")
  async upNewProduct(@Body() body: UpNewProductDto, @Req() req) {
    const { userId, userInfo } = req.user;
    const { userStore } = userInfo;
    const result = await this.storeService.upNewProduct(
      body,
      userId,
      userStore
    );
    return result;
  }
  /**
   * update single product for seller manager product
   * @param dto
   * @param req
   * @returns
   */
  @Post("update_product_single")
  async updateSingleProductController(
    @Body() dto: UpdateSingleProductDto,
    @Req() req,
    @Res() res: Response
  ) {
    const { userId, userStore } = req.user;

    if (!userStore) {
      throw new BadRequestException(
        "Error when authentication get user store id!"
      );
    }
    const result = await this.storeService.updateSingleProductService(
      dto,
      userStore,
      userId
    );
    const { message, resultCode, statusCode } = result;
    return res.status(statusCode).json({ message, resultCode });
  }
  /**
   * delete product part (attribute, imgDetail, attribute items)
   * @param dto
   * @param req
   */
  @Post("delete_action_single_product")
  async deleteActionSingleProductController(
    @Body() dto: DeleteActionSingleProductDto,
    @Req() req,
    @Res() res: Response
  ) {
    const { userId } = req.user;
    const result = await this.storeService.deleteActionSingleProductService(
      dto,
      userId
    );
    const { message, resultCode, statusCode } = result;
    return res.status(statusCode).json({ message, resultCode });
  }
  /**
   * Delete single product by id from request
   * @param id
   * @param req
   * @returns
   */
  @Delete("delete_single_product/:id")
  async deleteSingleProductController(
    @Param("id") id: string,
    @Req() req,
    @Res() res: Response
  ) {
    try {
      const { userId } = req.user;
      const proId = new mongoose.Types.ObjectId(id);
      await this.productModel.deleteOne({ _id: proId, sellerId: userId });
      return res.status(200).json({ message: `successfull`, resultCode: 1 });
    } catch (error) {
      return res.status(500).json({ message: `${error}`, resultCode: 0 });
    }
  }
  /**
   * =============
   * STORE MANAGER
   * =============
   */
}
