import mongoose from 'mongoose';
import { CreateNewProductDto } from './product-create-dto';
import { OmitType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty } from 'class-validator';

/**
 * class dto of update product repose
 */
export class UpdateProductDto extends OmitType(CreateNewProductDto, [
  'owner_info',
] as const) {
  @IsMongoId()
  @IsNotEmpty()
  id: mongoose.Types.ObjectId;
  constructor(partial: Partial<UpdateProductDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
