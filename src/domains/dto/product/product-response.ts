import mongoose from 'mongoose';

export class GetProductByQueryResponseDto {
  _id: mongoose.Types.ObjectId;
  info: {
    name: string;
    slug: string;
    brand: string;
    category_id: string;
  };
  varitants: {
    sku: string;
    attributes: { name: string; value: string }[];
  }[];
  original_price: number;
  sale: number;
  rating: number;
  sold: string;
  isActive: boolean;
}
