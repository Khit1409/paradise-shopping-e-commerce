import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

/**
 * Product
 */
@Schema({ collection: "products", timestamps: true })
export class Product {
  @Prop()
  proCateSlug: string;
  @Prop() proName: string;
  @Prop() proTag: string;
  @Prop({ type: String }) storeId: string;
  @Prop({ type: String }) sellerId: string;
  @Prop() proSlug: string;
  @Prop()
  @Prop({ type: Number })
  proPrice: number;
  @Prop({ type: Number, max: 100 })
  proSale: number;
  @Prop() proImg: string;
  @Prop() proDescription: string;
  // attribute
  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId },
        attrName: String,
        items: [
          {
            _id: { type: Types.ObjectId },
            itemValue: String,
            itemImg: String,
          },
        ],
      },
    ],
  })
  proAttributes: {
    _id: Types.ObjectId;
    attrName: string;
    items: {
      _id: Types.ObjectId;
      itemValue: string;
      itemImg: string;
    }[];
  }[];
  // imgdetail
  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId },
        imgUrl: String,
      },
    ],
  })
  proImgDetails: {
    _id: Types.ObjectId;
    imgUrl: string;
  }[];
}

/**
 * Export Schemas
 */
export const ProductSchema = SchemaFactory.createForClass(Product);

/**
 * Export Document Types
 */

export type ProductDoc = Product & Document;
