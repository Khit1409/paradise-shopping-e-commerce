import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'user_informations' })
export class UserInformation {
  @Prop({ type: String, required: true })
  user_id: string;

  @Prop({
    type: [String],
    _id: false,
    required: true,
  })
  email: string[];

  @Prop({
    type: [String],
    _id: false,
    required: true,
  })
  phone: string[];

  @Prop({
    type: [String],
    _id: false,
    required: true,
  })
  address: string[];
}

export type UserInformationDoc = UserInformation & Document;

export const UserInformationSchema: MongooseSchema<UserInformation> =
  SchemaFactory.createForClass(UserInformation);
