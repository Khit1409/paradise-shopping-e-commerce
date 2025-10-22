import { Type } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from "class-validator";

/**
 * ==================
 * dto update product
 * ==================
 */

//=====================
/**
 * type of product img detail dto
 */
export class UpdateSingleProductImgDetailDto {
  @IsString()
  _id?: string;
  @IsOptional()
  @IsString()
  imgUrl?: string;
}
/**
 * type of attribute dto
 */
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
/**
 * type of attribute item dto
 */
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
/**
 * update request got from client
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
