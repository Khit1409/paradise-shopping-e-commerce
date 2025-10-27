import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
@Schema({ collection: "orderAttributes", timestamps: false })
export class OrderAttributes {
  @Prop({ type: String })
  ofOrderId: string;
  @Prop({
    type: [{ attributeName: String, attributeValue: String }],
    required: true,
    _id: false,
  })
  attribute: {
    attributeName: string;
    attributeValue: string;
  };
}

export type OrderAttributeDoc = OrderAttributes & Document;
export const orderAttrSchema = SchemaFactory.createForClass(OrderAttributes);
