import { UIController } from '@/controllers/ui.controller';
import {
  CarouselSchema,
  NavigationSchema,
} from '@/infrastructure/database/mongoose/schemas/ui.schema';
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
    ]),
  ],
  controllers: [UIController],
  providers: [UIService],
})
export class UIModule {}
