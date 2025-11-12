import mongoose from 'mongoose';
/**
 * cart varitant attribute update dto
 */
export class UpdateCartVaritantAttributeDto {
  name: string;
  value: string;
  constructor(partial: Partial<UpdateCartVaritantAttributeDto>) {
    Object.assign(this, partial);
  }
}
/**
 * cart varitant update dto
 */
export class UpdateCartVaritantDto {
  sku: string;
  attributes: UpdateCartVaritantAttributeDto[];
  constructor(partial: Partial<UpdateCartVaritantDto>) {
    Object.assign(this, partial);
  }
}
/**
 * cart update dto
 */
export class UpdateCartDto {
  id: mongoose.Types.ObjectId;
  varitants: UpdateCartVaritantDto;
  quantity: number;
  constructor(partial: Partial<UpdateCartDto>) {
    Object.assign(this, partial);
  }
}
