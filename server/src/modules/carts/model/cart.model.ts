import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
/**
 * export type and schema
 */
export type cartDoc = Cart & Document;

/**
 * cart just is snapshot
 * if product is remove, cart is not usefull, just for watch
 * when user join to single product page by cart proId if proid is remove
 * return product is remove
 */
@Schema({ collection: "carts", timestamps: true })
export class Cart {
  @Prop()
  cartImg: string;
  @Prop({ type: String })
  userId: string;
  @Prop()
  cartName: string;
  @Prop({ type: Number })
  cartPrice: number;
  //just using in client for go to single product page
  @Prop({ type: mongoose.Types.ObjectId })
  proId: mongoose.Types.ObjectId;
  @Prop({ type: Number })
  cartQuantity: number;
  @Prop({ type: Number })
  cartTotalPrice: number;
  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId },
        attrName: String,
        itemValue: String,
        otherValue: [{ value: String }],
      },
    ],
  })
  cartAttributes: {
    _id: Types.ObjectId;
    attrName: string;
    itemValue: string;
    otherValue: {
      value: string;
    }[];
  }[];
}
export const cartSchema = SchemaFactory.createForClass(Cart);
