import { Type } from "class-transformer";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Types } from "mongoose";
/*
 * get product single dto
 */
export class getSingleProductDto {
  @IsOptional()
  @IsString()
  slug?: string;
  @IsOptional()
  id?: Types.ObjectId | string;
}

/**
 * get product dto
 */
export class GetProductDto {
  @IsOptional()
  @IsNumber()
  page?: number;
  @IsOptional()
  @IsNumber()
  pro_price?: number;
  @IsOptional()
  @IsNumber()
  pro_sale?: number;
  @IsOptional()
  @IsString()
  area?: string;
  @IsOptional()
  @IsString()
  cate_slug?: string;
}
/**
 * Attribute value item
 */
export class AttributeItemDto {
  @IsString()
  value: string;
  @IsOptional()
  @IsString()
  img?: string;
}
/*
 *attribute
 */
export class ProductAttributeDto {
  @IsString()
  name: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeItemDto)
  item: AttributeItemDto[];
}
/**
 * Img detail
 */
export class ImgDetailDto {
  @IsString()
  imgUrl: string;
}
/**
 * Up products
 */
export class UpProductDto {
  @IsString()
  name: string;
  @IsString()
  cate_slug: string;
  @IsString()
  storeId: string;
  @IsString()
  sellerId: string;
  @IsNumber()
  price: number;
  @IsNumber()
  sale: number;
  @IsString()
  hashtag: string;
  @IsString()
  description: string;
  @IsString()
  img?: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImgDetailDto)
  imgDetail?: ImgDetailDto[];
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductAttributeDto)
  attribute?: ProductAttributeDto[];
}

/**
 * dto update product
 */
export class UpdateSingleProductDto {
  @IsOptional()
  @IsString()
  proCateSlug?: string;
  @IsString()
  product_id: string;
  @IsOptional()
  @IsString()
  proName?: string;
  @IsOptional()
  @IsNumber()
  proPrice?: number;
  @IsOptional()
  @IsString()
  proDescription?: string;
  @IsOptional()
  @IsNumber()
  proSale?: string;
  @IsOptional()
  @IsString()
  proImg: string;
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSingleProductImgDetailDto)
  imgDetail?: UpdateSingleProductImgDetailDto[];
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSingleProductAttributeDto)
  attribute?: UpdateSingleProductAttributeDto[];
}

export class UpdateSingleProductImgDetailDto {
  @IsString()
  _id?: string;
  @IsOptional()
  @IsString()
  imgUrl?: string;
}

export class UpdateSingleProductAttributeDto {
  @IsString()
  _id: string;
  @IsOptional()
  @IsString()
  attrName?: string;
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSingleProductAttributeItemDto)
  items?: UpdateSingleProductAttributeItemDto[];
}

export class UpdateSingleProductAttributeItemDto {
  @IsString()
  _id: string;
  @IsOptional()
  @IsString()
  itemValue?: string;
  @IsOptional()
  @IsString()
  itemImg: string;
}

export class DeleteActionSingleProductDto {
  @IsOptional()
  @IsString()
  proId?: string;
  @IsOptional()
  @IsArray()
  @Type(() => DeleteImageDetail)
  imgDetail?: DeleteImageDetail[];
  @IsOptional()
  @IsArray()
  @Type(() => DeleteAttribute)
  attribute?: DeleteAttribute[];
  @IsOptional()
  @IsArray()
  @Type(() => DeleteAttributeItem)
  attributeItem?: DeleteAttributeItem[];
}

export class DeleteImageDetail {
  @IsString()
  _id: string;
}
export class DeleteAttribute {
  @IsString()
  _id: string;
}
export class DeleteAttributeItem {
  @IsString()
  attrId: string;
  @IsString()
  _id: string;
}
