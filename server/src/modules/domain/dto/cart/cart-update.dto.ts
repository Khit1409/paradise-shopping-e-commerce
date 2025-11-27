import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
/**
 * cart varitant attribute update dto
 */
export class UpdateCartVaritantAttributeDto {
  @IsString()
  name: string;
  @IsString()
  value: string;
  constructor(partial: Partial<UpdateCartVaritantAttributeDto>) {
    Object.assign(this, partial);
  }
}
/**
 * cart varitant update dto
 */
export class UpdateCartVaritantDto {
  @IsString()
  sku: string;
  @ValidateNested()
  @Type(() => UpdateCartVaritantAttributeDto)
  @IsArray()
  @ArrayNotEmpty()
  attributes: UpdateCartVaritantAttributeDto[];
  constructor(partial: Partial<UpdateCartVaritantDto>) {
    Object.assign(this, partial);
  }
}
/**
 * cart update dto
 */
export class UpdateCartDto {
  @IsMongoId()
  @IsNotEmpty()
  id: mongoose.Types.ObjectId;
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCartVaritantDto)
  varitants: UpdateCartVaritantDto;
  @IsNumber()
  @IsOptional()
  quantity: number;
  constructor(partial: Partial<UpdateCartDto>) {
    Object.assign(this, partial);
  }
}
