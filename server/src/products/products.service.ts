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
import { StoreEntity } from "src/store/entity/store.entity";
import { Repository } from "typeorm";
import {
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
  async getProductPreview(query: {
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
   * get product for shop page
   * @param dto
   * @returns
   */
  async getProductShopService(
    dto: GetProductDto
  ): Promise<ProductShopPageResponse> {
    try {
      /**
       * query khu vực
       * query giá
       * query danh mục
       * loại sản phẩm
       */
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
