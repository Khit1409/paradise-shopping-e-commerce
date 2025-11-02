import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

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
// /**
//  * information
//  */
// @Schema({ _id: false, timestamps: false })
// class ProductInformation {
//   @Prop({ type: String, required: true })
//   name: string;
//   @Prop({ type: String, required: true })
//   slug: string;
//   @Prop({ type: String, required: true })
//   description: string;
//   @Prop({ type: String, required: false })
//   brand?: string;
//   @Prop({ type: mongoose.Types.ObjectId, required: true })
//   category_id: mongoose.Types.ObjectId;
// }
// /**
//  * Varitan
//  */
// @Schema({ _id: false, timestamps: false })
// class ProductVaritan {
//   @Prop({ type: String, required: true })
//   sku: string;
//   @Prop({ type: Number, required: true })
//   stoke: number;
//   @Prop({ type: [{ name: String, value: String }] })
//   attributes: {
//     name: string;
//     value: string;
//   }[];
//   @Prop({ type: String })
//   image?: string;
// }

// @Schema({ _id: false, timestamps: false })
// class ProductOwnerInformation {
//   @Prop({ type: String, required: true })
//   seller_id: string;
//   @Prop({ type: String, required: true })
//   store_id: string;
// }
// /**
//  * Main Schema
//  */
// @Schema({ _id: true, timestamps: true })
// export class Product extends Document {
//   @Prop({ type: ProductOwnerInformation })
//   owner_info: ProductOwnerInformation;

//   @Prop({ type: ProductInformation })
//   info: ProductInformation;

//   @Prop({ type: [ProductVaritan] })
//   varitants: ProductVaritan[];

//   @Prop({ type: Number })
//   rating: number;

//   @Prop({ type: Number })
//   sold: number;

//   @Prop({ type: Boolean })
//   isActive: boolean;

//   @Prop({ type: [String] })
//   tags: string[];

//   @Prop({ type: [String] })
//   images: string[];

//   @Prop({ type: String })
//   thumbnail: string;
// }

// export const ProductSchema = SchemaFactory.createForClass(Product);
