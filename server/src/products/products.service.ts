import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { ProductDoc } from "./models/product.model";
import mongoose, { isValidObjectId, Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  GetProductDto,
  getSingleProductDto,

} from "./dto/product.dto";

/**
 * Remember** lean<Type>()
 */

import { createSlug } from "src/feature/feature";
import { InjectRepository } from "@nestjs/typeorm";
import { StoreEntity } from "src/store/entity/store.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/users/entity/user.entity";
import {
  NormalHandleResponse,
  ProductHomeDataType,
  ProductHomePageResponse,
  ProductPreviewDataType,
  ProductShopPageResponse,
  SingleProductDataType,
  SingleProductResponse,
} from "src/interfaces/server.types";

@Injectable()
export class ProductsService {
  constructor(
    //regist model
    @InjectModel("Product") private productModel: Model<ProductDoc>,

    //sql
    @InjectRepository(StoreEntity)
    private readonly storeRepo: Repository<StoreEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}
  /**
   * Get product for home page
   * get about 50 product for each page , limit is 50 skip is page * limit - limit
   * @param dto
   * @returns
   */
  async getHomeProductService(dto: {
    page: number;
  }): Promise<ProductHomePageResponse> {
    try {
      const api = await this.productModel
        .find()
        .select("proName proPrice proSlug proCateSlug proImg")
        .limit(50)
        .skip(
          Number(dto.page) * 50 - 50 //page * limit - limit
        )
        .lean<ProductHomeDataType[]>();
      return { resultCode: 1, api, message: "successfull", statusCode: 200 };
    } catch (error) {
      return { resultCode: 0, api: [], message: `${error}`, statusCode: 500 };
    }
  }
  /**
   * get product for shop page
   * @param dto
   * @returns
   */
  async getProductShopService(
    dto: GetProductDto
  ): Promise<ProductShopPageResponse> {
    try {
      const storeQuery: { storeAreaSlug?: string } = {};

      if (dto.area) storeQuery.storeAreaSlug = dto.area;
      const proQuery: {
        proCateSlug?: string;
      } = {};

      if (dto.cate_slug) proQuery.proCateSlug = dto.cate_slug;
      const store = await this.storeRepo.find({ where: storeQuery });

      const data = await Promise.all(
        store.map(async (s) => {
          const pro = await this.productModel
            .find({
              storeId: s.storeId.toLowerCase(),
              ...proQuery,
              proPrice: dto.pro_price
                ? { $lte: Number(dto.pro_price) }
                : { $gte: 0 },
              proSale: dto.pro_sale
                ? { $lte: Number(dto.pro_sale) }
                : { $gte: 0 },
            })
            .lean<ProductPreviewDataType[]>();
          return {
            storeId: s.storeId,
            storeName: s.storeName,
            storeArea: s.storeArea,
            products: pro,
          };
        })
      );
      return { message: "Got!", api: data, resultCode: 1, statusCode: 200 };
    } catch (error) {
      return { message: `${error}`, api: [], resultCode: 0, statusCode: 500 };
    }
  }
  /**
   *
   * @returns
   */
  /**
   * get single products
   */
  async getSingleProductService(
    dto: getSingleProductDto
  ): Promise<SingleProductResponse> {
    try {
      if (!dto.id && !dto.slug) {
        throw new BadRequestException(`Vui lòng truyền tham số query`);
      }
      const product = await this.productModel
        .findOne({
          ...(dto &&
            (dto.id
              ? { _id: new mongoose.Types.ObjectId(dto.id) }
              : { proSlug: dto.slug })),
        })
        .lean<SingleProductDataType>();
      if (!product) {
        throw new BadRequestException("Product not define!");
      }
      const relatedProduct = await this.productModel
        .find({ _id: { $ne: product._id }, proCateSlug: product.proCateSlug })
        .select("proName proPrice proSlug proCateSlug proImg")
        .limit(12) // loại luôn product hiện tại
        .lean<ProductPreviewDataType[]>();
      return {
        message: "successfull!",
        resultCode: 1,
        statusCode: 200,
        api: {
          product: product,
          related: relatedProduct,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
