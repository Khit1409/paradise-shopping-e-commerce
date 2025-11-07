import { InjectModel } from '@nestjs/mongoose';
import { ProductDoc } from '../schemas/product.schema';
import { IProductRepository } from '@/domains/repositories/product.repository.interface';
import { GetProductByQueryDto } from '@/domains/dto/product/product-get.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreOrmEntity } from '../../typeorm/entities/store.sql.entity';
import { Repository } from 'typeorm';
import { FilterQuery, Model } from 'mongoose';
import { GetProductByQueryResponseDto } from '@/domains/dto/product/product-response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductMongooRepository implements IProductRepository {
  constructor(
    @InjectRepository(StoreOrmEntity)
    private store: Repository<StoreOrmEntity>,
    @InjectModel('ProductModel')
    private productModel: Model<ProductDoc>,
  ) {}

  /**
   * create query by query get on request url
   * @param dto
   * @returns
   */
  createQuery: (
    dto: GetProductByQueryDto,
    seller_id?: string,
    store_id?: string,
  ) => Promise<{
    limit: number;
    skip: number;
    query: FilterQuery<ProductDoc>;
  }> = async (
    dto: GetProductByQueryDto,
    seller_id?: string,
    store_id?: string,
  ) => {
    const {
      page,
      max_price,
      max_sale,
      min_price,
      min_sale,
      brand,
      location,
      category,
    } = dto;
    const query: FilterQuery<ProductDoc> = {};
    const limit = 30;
    const skip = page * limit - limit;

    if (location) {
      const stores = await this.store.find({
        where: { storeAreaSlug: location },
      });
      const storeIdList = stores
        .map((s) => String(s.storeId.toLowerCase()))
        .filter(Boolean);

      query['owner_info.store_id'] = { $in: storeIdList };
    }

    if (seller_id && store_id) {
      query['$and'] = [
        { 'owner_info.seller_id': seller_id },
        { 'owner_info.store_id': store_id },
      ];
    }
    if (min_price || max_price) {
      query['original_price'] = {
        ...(min_price ? { $gte: Number(min_price) } : {}),
        ...(max_price ? { $lte: Number(max_price) } : {}),
      };
    }
    if (min_sale || max_sale) {
      query['sale'] = {
        ...(min_sale ? { $gte: Number(min_sale) } : {}),
        ...(max_sale ? { $lte: Number(max_sale) } : {}),
      };
    }
    if (category) {
      query['info.category'] = category;
    }
    console.log(query['owner_info.store_id']);
    if (brand) query['info.brand'] = brand;
    return { limit, skip, query };
  };
  /**
   * get product list by query
   * @param dto
   * @returns
   */
  getProductList: (
    dto: GetProductByQueryDto,
    seller_id?: string,
    store_id?: string,
  ) => Promise<GetProductByQueryResponseDto[]> = async (
    dto: GetProductByQueryDto,
    seller_id?: string,
    store_id?: string,
  ) => {
    const filterValue = await this.createQuery(dto, seller_id, store_id);
    const { limit, query, skip } = filterValue;
    const select = {
      _id: 1,
      info: 1,
      thumbnail: 1,
      sale: 1,
      rating: 1,
      sold: 1,
      original_price: 1,
      isActive: 1,
    };
    const products = await this.productModel.aggregate([
      { $match: { ...query, isActive: true } },
      { $limit: limit },
      { $skip: skip },
      { $project: select },
    ]);
    return products as GetProductByQueryResponseDto[];
  };
  /**
   * get product single
   * @param id
   */
  getSingleProduct: (id: string, seller_id?: string) => Promise<ProductDoc> =
    async (id: string, seller_id?: string) => {
      const product = await this.productModel.findOne({
        ...(seller_id
          ? { $and: [{ 'owner_info.seller_id': seller_id }, { _id: id }] }
          : { _id: id }),
      });
      if (!product) {
        return null;
      }
      return product;
    };
}
