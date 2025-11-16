import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/**
 * schema of api attributes for seller edit or create product varitant
 */
@Schema({ _id: false, timestamps: false })
class Attribute {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: [String], required: true })
  value: string[];
}
/**
 * schema of edit product api for seller using edit product or clear products.
 */
@Schema({ collection: 'edit_products', timestamps: true })
export class EditProduct {
  @Prop({ type: String })
  category: string;
  @Prop({ type: [String] })
  brands: string[];
  @Prop({ type: [Attribute] })
  attributes: Attribute[];
}

export type EditProductDoc = EditProduct & Document;
export const EditProductSchema = SchemaFactory.createForClass(EditProduct);
