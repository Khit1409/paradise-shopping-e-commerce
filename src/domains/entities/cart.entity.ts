import mongoose from 'mongoose';
/**
 * Fake cart structure data
 */
export class Cart {
  constructor(
    public id: mongoose.Types.ObjectId,
    public info: {
      product_id: mongoose.Types.ObjectId;
      name: string;
      slug: string;
    },
    public varitants: {
      sku: string;
      attributes: {
        name: string;
        value: string;
      }[];
    },
    public quantity: number,
    public total_price: number,
    public orginal_price: number,
    public thumbnail: string,
  ) {}
}
