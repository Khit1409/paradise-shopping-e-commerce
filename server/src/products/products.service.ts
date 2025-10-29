import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { ProductDoc } from "./models/product.model";
import mongoose, { isValidObjectId, Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { GetProductDto, getSingleProductDto } from "./dto/product.dto";

/**
 * Remember** lean<T>()
 */
import { InjectRepository } from "@nestjs/typeorm";
import { StoreEntity } from "src/seller/entity/store.entity";
import { Repository } from "typeorm";
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
    private readonly storeRepo: Repository<StoreEntity>
  ) {}
  /**
   * get product preview
   * if have id => get for seller manager
   * else => user page
   * @param userId
   * @param page
   */
  async getProducts(query: {
    page: number;
    minPrice: number;
    maxPrice?: number;
    category?: string;
    area?: string;
    minSale: number;
    maxSale?: number;
  }): Promise<ProductPreviewDataType[]> {
    try {
      // { pro_price, cate_slug, area, pro_sale, page }
      const select = {
        _id: 1,
        proName: 1,
        proPrice: 1,
        proSlug: 1,
        proCateSlug: 1,
        proSale: 1,
        proImg: 1,
      };
      const { page, category, maxPrice, maxSale, minPrice, minSale, area } =
        query;
      /**
       * query sale and price
       */
      const priceQuery: { $lte?: number; $gte: number } = {
        $gte: Number(minPrice) ?? 0,
      };
      const saleQuery: { $lte?: number; $gte: number } = {
        $gte: Number(minSale) ?? 0,
      };
      if (maxPrice) priceQuery.$lte = Number(maxPrice);
      if (maxSale) saleQuery.$lte = Number(maxSale);
      /**
       * filter quantity product
       */
      const limit: number = 50;
      const skip: number = (page ?? 1) * limit - limit;
      /**
       * set seller id if query with are
       */
      let storeId: string[] = [];
      if (area) {
        const store = await this.storeRepo.find({
          where: {
            storeAreaSlug: area,
          },
        });
        storeId = store.map((item) => item.storeId.toLowerCase());
      }
      /**
       * create match object
       */
      const match: any = {};
      if (area && storeId.length !== 0) {
        match.storeId = { $in: storeId };
      } else if (area && storeId.length == 0) {
        match.storeId = { $in: ["unknow"] };
      }
      if (maxPrice || minPrice) match.proPrice = priceQuery;
      if (maxSale || minSale) match.proSale = saleQuery;
      if (category) match.proCateSlug = category;
      /**
       * query action
       */
      const api: ProductPreviewDataType[] = await this.productModel.aggregate([
        {
          $match: match,
        },
        { $project: select },
        { $limit: limit },
        { $skip: skip },
      ]);

      return api;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   *
   * @returns
   */
  /**
   * get single products
   */
  async getSingleProduct(id: string): Promise<SingleProductDataType> {
    try {
      if (!id) {
        throw new BadRequestException(`Vui lòng truyền tham số query`);
      }
      const product = await this.productModel
        .findById(new mongoose.Types.ObjectId(id))
        .select("-createdAt -updatedAt -__v")
        .lean<SingleProductDataType>();
      if (!product) {
        throw new BadRequestException("Product not define!");
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
