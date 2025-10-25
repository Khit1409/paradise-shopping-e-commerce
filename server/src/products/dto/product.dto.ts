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
