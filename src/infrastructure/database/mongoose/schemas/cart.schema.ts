import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ _id: false, timestamps: false })
class CartModelInfo {
  @Prop({ type: mongoose.Types.ObjectId })
  product_id: mongoose.Types.ObjectId;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  slug: string;
}

@Schema({ _id: false, timestamps: false })
class CartVaritant {
  @Prop({ type: String, required: true })
  sku: string;
  @Prop({
    type: [{ name: String, value: String, other: [String] }],
    required: true,
  })
  attributes: { name: string; value: string; other: string[] }[];
}

@Schema({ collection: 'carts', timestamps: true })
export class CartModel extends Document {
  @Prop({ type: String, required: true })
  user_id: string;
  @Prop({ type: CartModelInfo, required: true })
  info: CartModelInfo;
  @Prop({ type: CartVaritant, required: true })
  varitants: CartVaritant;
  @Prop({ type: String, required: true })
  thumbnail: string;
  @Prop({ type: Number, required: true })
  quantity: number;
  @Prop({ type: Number, required: true })
  total_price: number;
  @Prop({ type: Number, required: true })
  original_price: number;
}

export type CartDoc = CartModel & Document;
export const CartSchema = SchemaFactory.createForClass(CartModel);
