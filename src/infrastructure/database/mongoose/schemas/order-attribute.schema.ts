import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'order_varitants', timestamps: false })
export class OrderVaritants {
  @Prop({ type: String })
  order_id: string;
  @Prop({ type: String, unique: false, required: true })
  sku: string;
  @Prop({
    type: [{ name: String, value: String }],
    required: true,
    _id: false,
  })
  attributes: {
    name: string;
    value: string;
  }[];
}

export type OrderVaritantDoc = OrderVaritants & Document;
export const OrderVaritantSchema = SchemaFactory.createForClass(OrderVaritants);
