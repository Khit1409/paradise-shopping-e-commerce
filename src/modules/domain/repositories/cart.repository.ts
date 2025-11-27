import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CartDoc } from '@/infrastructure/database/mongoodb/cart.schema';
import { CreateNewCartDto } from '@/domain/dto/cart/cart-create.dto';
import { ProductDoc } from '@/infrastructure/database/mongoodb/product.schema';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateCartDto } from '@/domain/dto/cart/cart-update.dto';
import { SingleProductResponseDto } from '@/modules/domain/dto/product/product-response-dto';
import { CartResponseDto } from '@/domain/dto/cart/cart-response.dto';
import { CartListFinishedHandle } from '@/types/cart/cart.type';
import { CartMapper } from '@/mapper/cart.mapper';
import { ICartRepository } from '@/interfaces/repositories/cart.repository.interface';
import { GeneralHandleResponse } from '@/interfaces/repositories/general.interface';

/**
 * original handle database from schema or entity. using by service and using (mongoose or sql server) document
 * for query and response formated data to controller response to client
 */
@Injectable()
export class CartMongooRepository implements ICartRepository {
  constructor(
    @InjectModel('CartModel') private readonly cartModel: Model<CartDoc>,
    @InjectModel('ProductModel')
    private readonly productModel: Model<ProductDoc>,
  ) {}

  /**
   * create new cart by user id
   * @param dto
   * @param user_id
   * @returns
   */
  create: (
    dto: CreateNewCartDto,
    user_id: string,
  ) => Promise<GeneralHandleResponse> = async (dto, user_id) => {
    if (!user_id) {
      return {
        error: 'Not found',
        message: 'Id of user is not define!',
        success: false,
      };
    }
    try {
      const existingCart = await this.cartModel.findOne({
        'info.product_id': dto.info.product_id,
        user_id,
      });
      const product = await this.productModel
        .findById(dto.info.product_id)
        .lean<SingleProductResponseDto>();
      const newVaritants = {
        ...dto.varitants,
        attributes: dto.varitants.attributes.map((m) => ({
          ...m,
          other: product.varitants
            .find((f) => f.sku === dto.varitants.sku)
            ?.attributes.find((f) => f.name === m.name)
            .value.filter((ft) => ft !== m.value),
        })),
      };
      /**
       * just update if existing cart in database
       */
      if (existingCart) {
        const result = await this.updatePatch(
          {
            id: existingCart._id as mongoose.Types.ObjectId,
            varitants: dto.varitants,
            quantity: dto.quantity,
          },
          user_id,
        );
        if (!result.success) {
          return result;
        }
        await existingCart.save();
        return {
          error: null,
          message: 'Add to cart successful!',
          success: true,
        };
      }
      const newCart = await this.cartModel.create({
        user_id,
        info: {
          product_id: dto.info.product_id,
          name: dto.info.name,
          slug: dto.info.slug,
        },
        quantity: dto.quantity,
        total_price: dto.total_price ?? dto.quantity * dto.original_price,
        thumbnail: dto.thumbnail,
        varitants: newVaritants,
        original_price: dto.original_price,
      });
      if (!newCart) {
        return {
          message: 'Error when creare new cart!',
          error: 'cant create new',
          success: false,
        };
      }
      return {
        error: null,
        message: 'Add to cart successful!',
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
  /**
   * @param id
   * @returns
   */
  getByUserId: (id: string) => Promise<CartResponseDto[]> = async (id) => {
    if (!id) {
      return null;
    }
    try {
      const carts = await this.cartModel
        .find({ user_id: id })
        .sort({ createdAt: -1 })
        .lean<CartListFinishedHandle[]>();
      return CartMapper.formatCartResponse(carts);
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
  /**
   * Delete cart by id from param
   * @param id
   * @returns
   */
  delete: (id: string) => Promise<GeneralHandleResponse> = async (id) => {
    try {
      await this.cartModel.findByIdAndDelete(id);
      return { message: 'Delete cart is success', error: null, success: true };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
  /**
   *
   */
  updatePatch: (
    dto: UpdateCartDto,
    user_id: string,
  ) => Promise<GeneralHandleResponse> = async (dto, user_id) => {
    try {
      const cartData = await this.cartModel.findOne({
        _id: new mongoose.Types.ObjectId(dto.id),
        user_id,
      });
      if (!cartData) {
        throw new BadRequestException(
          `cart with ${String(dto.id)} is not define in database!`,
        );
      }
      if (dto.quantity) {
        cartData.quantity = dto.quantity;
        cartData.total_price = cartData.original_price * dto.quantity;
      }
      const product = await this.productModel.findById(
        cartData.info.product_id,
      );
      if (!product) {
        throw new BadRequestException(
          `product with ${String(cartData.info.product_id)} is not define`,
        );
      }

      if (dto.varitants.attributes.length > 0) {
        const productVaritant = product.varitants.find(
          (f) => f.sku === dto.varitants.sku,
        );
        if (!productVaritant) {
          throw new BadRequestException(
            `varitant with sku: ${dto.varitants.sku} is not define!`,
          );
        }
        const attributes = dto.varitants.attributes.map((attr) => ({
          ...attr,
          other: productVaritant.attributes
            .find((f) => f.name == attr.name)
            .value.filter((val) => val !== attr.value),
        }));
        cartData.varitants = {
          ...cartData.varitants,
          attributes: attributes,
        };
      }
      await cartData.save();
      return {
        message: 'Update successful',
        error: null,
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
}
