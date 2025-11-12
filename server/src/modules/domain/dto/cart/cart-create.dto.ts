import mongoose from 'mongoose';
/**
 * create new cart informtaion dto
 */
export class CreateNewCartInformation {
  product_id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  constructor(partial: Partial<CreateNewCartInformation>) {
    Object.assign(this, partial);
  }
}
export class CreateNewCartVaritantAttributeDto {
  name: string;
  value: string;
  constructor(partial: Partial<CreateNewCartVaritantAttributeDto>) {
    Object.assign(this, partial);
  }
}
/**
 * create new cart varitant dto
 */
export class CreateNewCartVaritantDto {
  sku: string;
  attributes: CreateNewCartVaritantAttributeDto[];
  constructor(partial: Partial<CreateNewCartVaritantDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of create new cart
 */
export class CreateNewCartDto {
  info: CreateNewCartInformation;
  varitants: CreateNewCartVaritantDto;
  quantity: number;
  original_price: number;
  thumbnail: string;
  total_price: number;
  constructor(partial: Partial<CreateNewCartDto>) {
    Object.assign(this, partial);
  }
}
