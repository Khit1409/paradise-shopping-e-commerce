import mongoose from 'mongoose';

export class CreateNewCartDto {
  info: {
    product_id: mongoose.Types.ObjectId;
    name: string;
    slug: string;
  };
  varitants: {
    sku: string;
    attributes: { name: string; value: string }[];
  };
  quantity: number;
  total_price: number;
  original_price: number;
  thumbnail: string;
}
