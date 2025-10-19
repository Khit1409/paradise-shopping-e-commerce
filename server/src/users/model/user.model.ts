import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
/**
 * Address schema
 */

@Schema({ timestamps: true, collection: "userAddress" })
export class UserAddress extends Document {
  @Prop({ required: true, type: String })
  userId: string;
  @Prop({ type: [{ addressName: String }], required: true })
  address: { _id: Types.ObjectId; addressName: string }[];
}

/**
 * Phone contact
 */

@Schema({ timestamps: true, collection: "userPhones" })
export class UserPhone extends Document {
  @Prop({ type: String, required: true })
  userId: string;
  @Prop({ type: [{ phoneNum: String }], required: true })
  phone: { _id: Types.ObjectId; phoneNum: string }[];
}

/**
 * User email
 */
@Schema({ timestamps: true, collection: "userEmails" })
export class UserEmail extends Document {
  @Prop({ type: String, required: true })
  userId: string;
  @Prop({ type: [{ emailAddress: String }], required: true })
  email: { _id: Types.ObjectId; emailAddress: string }[];
}
/**
 * Export schema
 */
export const userEmailSchema = SchemaFactory.createForClass(UserEmail);
export const userPhoneSchema = SchemaFactory.createForClass(UserPhone);
export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);
