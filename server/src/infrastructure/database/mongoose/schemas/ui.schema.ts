import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'navigations', timestamps: false })
export class Navigation {
  @Prop({ type: String })
  icon: string;
  @Prop({ type: String })
  name: string;
  @Prop({ type: String })
  url: string;
}

@Schema({ collection: 'carousels', timestamps: false })
export class Carousel {
  @Prop({ type: String })
  title: string;
  @Prop({ type: String })
  thumbnail: string;
}

export const NavigationSchema = SchemaFactory.createForClass(Navigation);
export type NavigationDoc = Navigation & Document;

export const CarouselSchema = SchemaFactory.createForClass(Carousel);
export type CarouselDoc = Carousel & Document;
