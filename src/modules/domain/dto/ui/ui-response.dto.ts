import mongoose from 'mongoose';

/**
 * attribute response for edit or create product dto
 */
export class EditProductAttributeResponseDto {
  name: string;
  value: string[];
  constructor(parital: Partial<EditProductAttributeResponseDto>) {
    Object.assign(this, parital);
  }
}
/**
 * response edit api for seller create product dto
 */
export class EditProductResponseDto {
  _id: mongoose.Types.ObjectId;
  category: string;
  attributes: EditProductAttributeResponseDto[];
  brands: string[];
  constructor(partial: Partial<EditProductResponseDto>) {
    Object.assign(this, partial);
  }
}
