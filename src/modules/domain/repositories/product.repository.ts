import { InjectModel } from '@nestjs/mongoose';
import { ProductDoc } from '@/schema/product.schema';
import { IProductRepository } from '@/interfaces/repositories/product.repository.interface';
import { GetProductByQueryDto } from '@/domain/dto/product/product-get.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreOrmEntity } from '@/entities/store.entity';
import { Repository } from 'typeorm';
import { FilterQuery, Model, Types } from 'mongoose';
import {
  GetProductByQueryResponseDto,
  GetSingleProductResponseDto,
} from '@/modules/domain/dto/product/product-response-dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProductMapper } from '@/mapper/product.mapper';
import {
  GetProductByQueryFinishedHandle,
  GetSingleProductFinishedHandle,
} from '@/types/product/product.type';
import { GeneralHandleResponse } from '@/interfaces/repositories/general.interface';
import { CreateNewProductDto } from '../dto/product/product-create-dto';
import { OpenAIService } from '@/modules/services/openai.service';
import { UpdateProductDto } from '../dto/product/product-update.dto';
/**
 * original handle database from schema or entity. using by service and using (mongoose or sql server) document
 * for query and response formated data to controller response to client
 */
@Injectable()
export class ProductMongooRepository implements IProductRepository {
  constructor(
    @InjectRepository(StoreOrmEntity)
    private store: Repository<StoreOrmEntity>,
    @InjectModel('ProductModel')
    private productModel: Model<ProductDoc>,
    //other service
    private readonly openAiService: OpenAIService,
  ) {}
  /**
   * update product
   * @param dto
   * @param seller_id
   */
  update: (
    dto: UpdateProductDto,
    seller_id: string,
  ) => Promise<GeneralHandleResponse> = async (dto, seller_id) => {
    try {
      const product = await this.productModel.findOne({
        _id: dto.id,
        'owner_info.seller_id': seller_id,
      });
      if (!product) {
        return {
          message: `Product with ${String(dto.id)} is not define!`,
          error: 'product not found',
          success: false,
        };
      }
      const newHashtag = await this.openAiService.clearProductHashtag(
        dto.info.name,
        dto.info.description,
      );
      product.info = dto.info;
      product.varitants = dto.varitants;
      product.original_price = dto.original_price;
      product.sale = dto.sale;
      product.images = dto.images;
      product.tags = newHashtag;
      product.thumbnail = dto.thumbnail;
      await product.save();

      return {
        message: 'Successfully update product',
        success: true,
        error: null,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
  /***
   * delete product by id
   * @param id
   * @param seller_id
   */
  delete: (
    id: Types.ObjectId,
    seller_id: string,
  ) => Promise<GeneralHandleResponse> = async (id, seller_id) => {
    try {
      const deleted = await this.productModel.findOneAndDelete({
        _id: id,
        owner_info: { seller_id },
      });
      if (!deleted) {
        return {
          message: `Failed to delete product by id:${String(id)}`,
          success: false,
          error: 'delete error',
        };
      }
      return {
        message: `Successfully delete this product!`,
        success: true,
        error: null,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
  /**
   * stop seller product by id
   * @param id
   * @param seller_id
   */
  stopActive: (
    seller_id: string,
    id: Types.ObjectId,
  ) => Promise<GeneralHandleResponse> = async (seller_id, id) => {
    try {
      const product = await this.productModel.findOneAndUpdate(
        {
          _id: id,
          owner_info: { seller_id },
        },
        {
          isActive: false,
        },
      );
      if (!product) {
        return {
          message: `Failed to stop is active product by id:${String(id)}`,
          success: false,
          error: 'stop is active error',
        };
      }
      return {
        message: `Success full to stop sell this products`,
        success: true,
        error: null,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
  /**
   * @param dto
   * @param seller_id
   * @param store_id
   */
  create: (dto: CreateNewProductDto) => Promise<GeneralHandleResponse> = async (
    dto,
  ) => {
    try {
      const hastash = await this.openAiService.clearProductHashtag(
        dto.info.name,
        dto.info.description,
      );
      const newProductData = await this.productModel.create({
        ...dto,
        tags: hastash,
        rating: 5,
        sold: 0,
        isActive: true,
      });
      if (!newProductData) {
        return {
          message: 'Create new product is failed!',
          success: false,
          error: 'Create new data error',
        };
      }
      return {
        error: null,
        message: 'Create new product successfully!',
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
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
  }> = async (dto, seller_id, store_id) => {
    const query: FilterQuery<ProductDoc> = {};
    const limit = 30;
    const skip = dto.page * limit - limit;
    /**
     * filter by location
     */
    if (dto.location) {
      const stores = await this.store.find({
        where: { storeAreaSlug: dto.location },
      });
      const storeIdList = stores
        .map((s) => String(s.storeId.toLowerCase()))
        .filter(Boolean);

      query['owner_info.store_id'] = { $in: storeIdList };
    }
    /**
     * filter by owner id
     */
    if (seller_id && store_id) {
      query['$and'] = [
        { 'owner_info.seller_id': seller_id },
        { 'owner_info.store_id': store_id },
      ];
    }
    /**
     * filter by coast
     */
    if (dto.min_price || dto.max_price) {
      query['original_price'] = {
        ...(dto.min_price ? { $gte: Number(dto.min_price) } : {}),
        ...(dto.max_price ? { $lte: Number(dto.max_price) } : {}),
      };
    }
    if (dto.min_sale || dto.max_sale) {
      query['sale'] = {
        ...(dto.min_sale ? { $gte: Number(dto.min_sale) } : {}),
        ...(dto.max_sale ? { $lte: Number(dto.max_sale) } : {}),
      };
    }
    /**
     * filter by category & brand
     */
    if (dto.category) {
      query['info.category'] = dto.category;
    }
    if (dto.brand) query['info.brand'] = dto.brand;
    /**
     * return query formated
     */
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
    dto,
    seller_id,
    store_id,
  ) => {
    const filterValue = await this.createQuery(dto, seller_id, store_id);
    /***
     * skip limit and query formated
     */
    const { limit, query, skip } = filterValue;
    /**
     * selects project
     */
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
    const products =
      await this.productModel.aggregate<GetProductByQueryFinishedHandle>([
        { $match: { ...query, isActive: true } },
        { $limit: limit },
        { $skip: skip },
        { $project: select },
      ]);
    return ProductMapper.formatGetProductResponse(products);
  };
  /**
   * get product single
   * @param id
   */
  getSingleProduct: (
    id: string,
    seller_id?: string,
  ) => Promise<GetSingleProductResponseDto | null> = async (id, seller_id) => {
    const product =
      await this.productModel.findOne<GetSingleProductFinishedHandle>({
        ...(seller_id
          ? { $and: [{ 'owner_info.seller_id': seller_id }, { _id: id }] }
          : { _id: id }),
      });
    if (!product) {
      return null;
    }
    return ProductMapper.formatGetSingleProductResponse(product);
  };
}
