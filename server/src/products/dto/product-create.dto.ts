import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { ImgDetailDto, ProductAttributeDto } from "./product-get.dto";
import { Type } from "class-transformer";

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
