import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Subschemas
 */
@Schema({ _id: false })
export class ProductInformation {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) slug: string;
  @Prop({ required: true }) description: string;
  @Prop() brand?: string;
  @Prop({ required: true }) category: string;
}
export const ProductInformationSchema =
  SchemaFactory.createForClass(ProductInformation);

@Schema({ _id: false })
export class ProductVaritan {
  @Prop({ required: true }) sku: string;
  @Prop({ required: true }) stoke: number;
  @Prop({
    type: [{ name: String, value: [String] }],
    _id: false,
  })
  attributes: { name: string; value: string[] }[];
  @Prop() image?: string;
}
export const ProductVaritanSchema =
  SchemaFactory.createForClass(ProductVaritan);

@Schema({ _id: false })
export class ProductOwnerInformation {
  @Prop({ required: true }) seller_id: string;
  @Prop({ required: true }) store_id: string;
}
export const ProductOwnerInformationSchema = SchemaFactory.createForClass(
  ProductOwnerInformation,
);

/**
 * Main Schema
 */
@Schema({ _id: true, timestamps: true, collection: 'products' })
export class ProductModel extends Document {
  @Prop({ type: ProductOwnerInformation })
  owner_info: ProductOwnerInformation;

  @Prop({ type: ProductInformation })
  info: ProductInformation;

  @Prop({ type: [ProductVaritan] })
  varitants: ProductVaritan[];

  @Prop({ type: Number })
  rating: number;

  @Prop({ type: Number })
  sold: number;

  @Prop({ type: Number })
  sale: number;

  @Prop({ type: Number })
  original_price: number;

  @Prop({ type: Boolean })
  isActive: boolean;

  @Prop({ type: [String], _id: false })
  tags: string[];

  @Prop({ type: [String] })
  images: string[];

  @Prop({ type: String })
  thumbnail: string;
}
export type ProductDoc = ProductModel & Document;
export const ProductSchema = SchemaFactory.createForClass(ProductModel);
