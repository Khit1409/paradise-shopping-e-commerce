import { UIController } from '@/controller/ui.controller';
import { EditProductSchema } from '@/infrastructure/database/mongoodb/edit-product.schema';
import {
  CarouselSchema,
  NavigationSchema,
} from '@/infrastructure/database/mongoodb/ui.schema';
import { UIService } from '@/services/ui.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Navigation',
        schema: NavigationSchema,
      },
      {
        name: 'Carousel',
        schema: CarouselSchema,
      },
      { name: 'EditProduct', schema: EditProductSchema },
    ]),
  ],
  controllers: [UIController],
  providers: [UIService],
})
export class UIModule {}
