import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ collection: 'user_informations' })
export class UserInformation {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({
    type: [{ _id: { type: Types.ObjectId }, emailAddress: String }],
    required: true,
  })
  email: { _id: Types.ObjectId; emailAddress: string }[];

  @Prop({
    type: [{ _id: { type: Types.ObjectId }, phoneNum: String }],
    required: true,
  })
  phone: { _id: Types.ObjectId; phoneNum: string }[];

  @Prop({
    type: [{ _id: { type: Types.ObjectId }, addressName: String }],
    required: true,
  })
  address: { _id: Types.ObjectId; addressName: string }[];
}

export type UserInformationDocument = UserInformation & Document;

export const UserInformationSchema: MongooseSchema<UserInformation> =
  SchemaFactory.createForClass(UserInformation);
