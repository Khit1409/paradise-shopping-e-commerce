import { Type } from "class-transformer";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

/**
 * Attribute value item
 */
class AttributeItemDto {
  @IsString()
  value: string;
  @IsOptional()
  @IsString()
  img?: string;
}
/*
 *attribute
 */
class ProductAttributeDto {
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
class ImgDetailDto {
  @IsString()
  imgUrl: string;
}
/**
 * Final type
 */
export class UpNewProductDto {
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
