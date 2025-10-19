import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "navigations" })
export class Navigations {
  @Prop()
  navIcon: string;
  @Prop()
  navName: string;
  @Prop()
  navUrl: string;
}

//export type
export type NavigationDoc = Navigations & Document;

//export schema
export const NavigationSchema = SchemaFactory.createForClass(Navigations);
