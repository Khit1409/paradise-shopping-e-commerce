import mongoose from 'mongoose';
import { CreateNewProductDto } from './product-create-dto';
import { OmitType } from '@nestjs/mapped-types';

/**
 * class dto of update product
 */
export class UpdateProductDto extends OmitType(CreateNewProductDto, [
  'owner_info',
] as const) {
  id: mongoose.Types.ObjectId;
  constructor(partial: Partial<UpdateProductDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
