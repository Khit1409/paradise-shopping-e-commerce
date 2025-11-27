import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'notifications', timestamps: true })
export class Notification {
  @Prop({ type: String, required: true })
  user_id: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  message: string;
  @Prop({ type: Boolean, required: true, default: false })
  seen: boolean;
}

export type NotificationDoc = Notification & Document & { createdAt: Date };
export const NotificationSchema = SchemaFactory.createForClass(Notification);
