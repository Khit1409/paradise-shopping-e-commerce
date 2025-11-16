import { EditProductDoc } from '@/infrastructure/database/mongoodb/edit-product.schema';
import {
  CarouselDoc,
  NavigationDoc,
} from '@/infrastructure/database/mongoodb/ui.schema';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EditProductResponseDto } from '../domain/dto/ui/ui-response.dto';

@Injectable()
export class UIService {
  constructor(
    @InjectModel('Navigation')
    private readonly navModel: Model<NavigationDoc>,
    @InjectModel('Carousel')
    private readonly carouselModel: Model<CarouselDoc>,
    @InjectModel('EditProduct')
    private readonly editProductModel: Model<EditProductDoc>,
  ) {}

  async getUI() {
    try {
      const [nav, carousel] = await Promise.all([
        this.navModel.find().select('-__v').lean(),
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

  /**
   * get api for create or edit product
   * @param category
   * @returns
   */
  async getEditProductApi(category?: string) {
    try {
      const select = {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      };
      const editApi =
        await this.editProductModel.aggregate<EditProductResponseDto>([
          { $match: { ...(category !== 'all' ? { category } : {}) } },
          { $project: select },
        ]);
      return editApi;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
