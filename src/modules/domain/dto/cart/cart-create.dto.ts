import { Type } from 'class-transformer';
import {
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

/**
 * create new cart informtaion dto
 */
export class CreateNewCartInformation {
  @IsMongoId()
  @IsNotEmpty()
  product_id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  constructor(partial: Partial<CreateNewCartInformation>) {
    Object.assign(this, partial);
  }
}
export class CreateNewCartVaritantAttributeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  constructor(partial: Partial<CreateNewCartVaritantAttributeDto>) {
    Object.assign(this, partial);
  }
}
/**
 * create new cart varitant dto
 */
export class CreateNewCartVaritantDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ValidateNested({ each: true })
  @Type(() => CreateNewCartVaritantAttributeDto)
  @IsArray()
  @ArrayNotEmpty()
  attributes: CreateNewCartVaritantAttributeDto[];

  constructor(partial: Partial<CreateNewCartVaritantDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of create new cart
 */
export class CreateNewCartDto {
  @ValidateNested()
  @Type(() => CreateNewCartInformation)
  info: CreateNewCartInformation;

  @ValidateNested()
  @Type(() => CreateNewCartVaritantDto)
  varitants: CreateNewCartVaritantDto;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  original_price: number;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsNumber()
  @Min(0)
  total_price: number;

  constructor(partial: Partial<CreateNewCartDto>) {
    Object.assign(this, partial);
  }
}
