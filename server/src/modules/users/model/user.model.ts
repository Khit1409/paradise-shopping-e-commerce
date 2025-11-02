import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
/**
 * user info
 */
@Schema({ timestamps: false, collection: "userInformations" })
export class UserInformations {
  @Prop({ type: String, required: true })
  userId: string;
  @Prop({ type: [{ emailAddress: String }], required: true })
  email: { _id: Types.ObjectId; emailAddress: string }[];
  @Prop({ type: [{ phoneNum: String }], required: true })
  phone: { _id: Types.ObjectId; phoneNum: string }[];
  @Prop({ type: [{ addressName: String }], required: true })
  address: { _id: Types.ObjectId; addressName: string }[];
}
/**
 * Export schema
 */
export type UserInforDoc = UserInformations & Document;
export const userInforSchema = SchemaFactory.createForClass(UserInformations);
