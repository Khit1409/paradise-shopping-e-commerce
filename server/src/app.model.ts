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

@Schema({ collection: "carousels" })
export class Carousel {
  @Prop({ type: String, required: true })
  imgUrl: string;
  @Prop({ type: String, required: true })
  title: string;
}
//export type
export type CarouselDoc = Carousel & Document;

//export schema
export const carouselSchema = SchemaFactory.createForClass(Carousel);
