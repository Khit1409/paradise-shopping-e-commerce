import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsNumber,
  Min,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  IsEmail,
} from 'class-validator';

/**
 * create new order item dto
 */
export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  name: string; //product name

  @IsIn(['COD', 'FLASH'])
  shipping_type: 'COD' | 'FLASH';

  @IsIn(['COD', 'ONLINE'])
  pay_type: 'COD' | 'ONLINE';

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  quantity: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  total_price: number;

  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsOptional()
  img?: string;

  constructor(partial: Partial<CreateOrderItemDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of create order contact
 */
export class CreateOrderContactDto {
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  constructor(partial: Partial<CreateOrderContactDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of create order varitant attribute
 */
export class CreateOrderVaritantAttributeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  constructor(partial: Partial<CreateOrderVaritantAttributeDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of create order varitant
 */
export class CreateOrderVaritantDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderVaritantAttributeDto)
  @IsArray()
  @ArrayNotEmpty()
  attributes: CreateOrderVaritantAttributeDto[];

  constructor(partial: Partial<CreateOrderVaritantDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of create order
 */
export class CreateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto;

  @ValidateNested()
  @Type(() => CreateOrderContactDto)
  contacts: CreateOrderContactDto;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderVaritantDto)
  @IsArray()
  @IsOptional()
  varitants?: CreateOrderVaritantDto;

  constructor(partial: Partial<CreateOrderDto>) {
    Object.assign(this, partial);
  }
}
