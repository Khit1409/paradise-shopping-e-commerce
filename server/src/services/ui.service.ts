import {
  CarouselDoc,
  NavigationDoc,
} from '@/infrastructure/database/mongoose/schemas/ui.schema';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UIService {
  constructor(
    @InjectModel('Navigation')
    private readonly navModel: Model<NavigationDoc>,
    @InjectModel('Carousel')
    private readonly carouselModel: Model<CarouselDoc>,
  ) {}

  async getUI() {
    try {
      const [nav, carousel] = await Promise.all([
        this.navModel.find().lean(),
        this.carouselModel.find().lean(),
      ]);
      return {
        nav,
        carousel,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
