import { GetProductByQueryDto } from '@/domain/dto/product/product-get.dto';
import {
  GetProductByQueryResponseDto,
  GetSingleProductResponseDto,
} from '@/modules/domain/dto/product/product-response-dto';
import {
  CreateNewProductRequest,
  GetProductByQueryFinishedHandle,
  GetProductByQueryRequest,
  GetSingleProductFinishedHandle,
  UpdateProductRequest,
} from '@/types/product/product.type';
import { CreateNewProductDto } from '../domain/dto/product/product-create-dto';
import { createProductSlug } from '@/util/create-slug-product-info';
import { UpdateProductDto } from '../domain/dto/product/product-update.dto';
import mongoose from 'mongoose';

/**
 * Format response hoặc request trước khi gửi về hoặc nhận từ client
 */

export class ProductMapper {
  /**
   * Format get product list before service using
   */
  static formatGetProductRequest(
    request: GetProductByQueryRequest,
  ): GetProductByQueryDto {
    return new GetProductByQueryDto({
      min_sale: request.min_sale,
      page: request.page ?? 1,
      brand: request.brand,
      category: request.category,
      location: request.location,
      max_price: request.max_price,
      max_sale: request.max_sale,
      min_price: request.min_price,
    });
  }
  /**
   * format get product list response when finished handle
   */
  static formatGetProductResponse(
    response: GetProductByQueryFinishedHandle[],
  ): GetProductByQueryResponseDto[] {
    return response.map(
      (res) =>
        new GetProductByQueryResponseDto({
          id: res._id.toString(),
          info: res.info,
          isActive: res.isActive,
          original_price: res.original_price,
          rating: res.rating,
          sale: res.sale,
          sold: res.sold,
          thumbnail: res.thumbnail,
        }),
    );
  }
  /**
   * format get single product response when finished handle
   */
  static formatGetSingleProductResponse(
    response: GetSingleProductFinishedHandle,
  ): GetSingleProductResponseDto {
    return new GetSingleProductResponseDto({
      id: response._id.toString(),
      info: response.info,
      isActive: response.isActive,
      original_price: response.original_price,
      rating: response.rating,
      sale: response.sale,
      sold: response.sold,
      varitants: response.varitants,
      thumbnail: response.thumbnail,
      images: response.images,
      tags: response.tags,
    });
  }
  /**
   * format create new product request to create new product dto
   */
  static formatCreateNewProductRequest(
    req: CreateNewProductRequest,
    seller_id: string,
    store_id: string,
  ): CreateNewProductDto {
    return new CreateNewProductDto({
      info: {
        brand: req.info.brand,
        category: req.info.category,
        description: req.info.description,
        name: req.info.name,
        slug: createProductSlug(req.info.name),
      },
      images: req.images,
      original_price: req.original_price,
      sale: req.sale,
      thumbnail: req.thumbnail,
      varitants: req.varitants,
      owner_info: {
        seller_id,
        store_id,
      },
    });
  }
  /**
   * format update product request
   */
  static formatUpdateProductRequest(
    req: UpdateProductRequest,
  ): UpdateProductDto {
    return new UpdateProductDto({
      id: new mongoose.Types.ObjectId(req.id),
      images: req.images,
      info: {
        ...req.info,
        slug: createProductSlug(req.info.name),
      },
      original_price: Number(req.original_price),
      sale: Number(req.sale),
      thumbnail: req.thumbnail,
      varitants: req.varitants,
    });
  }
}
