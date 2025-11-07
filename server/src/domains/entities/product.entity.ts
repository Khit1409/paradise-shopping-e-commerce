import mongoose from 'mongoose';

export class Product {
  constructor(
    public _id: mongoose.Types.ObjectId,
    public owner_info: {
      seller_id: string;
      store_id: string;
    },
    public info: {
      name: string;
      slug: string;
      description: string;
      brand?: string;
      category: string;
    },
    public varitants: {
      sku: string;
      attributes: {
        name: string;
        value: string;
      }[];
    }[],
    public rating: number,
    public sold: number,
    public sale: number,
    public original_price: number,
    public isActive: boolean,
    public tags: string[],
    public images: string[],
    public thumbnail: string,
  ) {}
}
