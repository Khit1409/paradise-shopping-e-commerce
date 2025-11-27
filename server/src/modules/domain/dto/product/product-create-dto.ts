import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  Min,
  ArrayNotEmpty,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * class up new product information Dto
 */
export class CreateNewProductInformationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  brand: string | undefined;

  constructor(partial: Partial<CreateNewProductInformationDto>) {
    Object.assign(this, partial);
  }
}
/**
 * class up new product variant attribute dto
 */
export class CreateNewProductVaritantAttributeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  value: string[];

  @IsString()
  @IsOptional()
  image: string | undefined;

  constructor(partial: Partial<CreateNewProductVaritantAttributeDto>) {
    Object.assign(this, partial);
  }
}
/**
 * class up new product owner information dto
 */
export class CreateNewProductOwnerInformationDto {
  @IsMongoId()
  @IsNotEmpty()
  seller_id: string;

  @IsMongoId()
  @IsNotEmpty()
  store_id: string;

  constructor(partial: Partial<CreateNewProductOwnerInformationDto>) {
    Object.assign(this, partial);
  }
}
/**
 * class of up new product variant dto
 */
export class CreateNewProductVaritantDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @Min(0)
  stoke: number;

  @ValidateNested({ each: true })
  @Type(() => CreateNewProductVaritantAttributeDto)
  @IsArray()
  attributes: CreateNewProductVaritantAttributeDto[];

  constructor(partial: Partial<CreateNewProductVaritantDto>) {
    Object.assign(this, partial);
  }
}
/**
 * class up new product Dto
 */
export class CreateNewProductDto {
  @ValidateNested()
  @Type(() => CreateNewProductInformationDto)
  info: CreateNewProductInformationDto;

  @ValidateNested()
  @Type(() => CreateNewProductOwnerInformationDto)
  owner_info: CreateNewProductOwnerInformationDto;

  @ValidateNested({ each: true })
  @Type(() => CreateNewProductVaritantDto)
  @IsArray()
  @ArrayNotEmpty()
  varitants: CreateNewProductVaritantDto[];

  @IsNumber()
  @Min(0)
  original_price: number;

  @IsNumber()
  @Min(0)
  sale: number;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  constructor(partial: Partial<CreateNewProductDto>) {
    Object.assign(this, partial);
  }
}
