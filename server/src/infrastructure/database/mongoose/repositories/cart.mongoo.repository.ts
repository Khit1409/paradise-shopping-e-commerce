import { ICartRepository } from '@/domains/repositories/cart.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CartDoc } from '../schemas/cart.schema';
import { CreateNewCartDto } from '@/domains/dto/cart/cart-create.dto';
import { ProductDoc } from '../schemas/product.schema';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateCartDto } from '@/domains/dto/cart/cart-update.dto';

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
  create: (dto: CreateNewCartDto, user_id: string) => Promise<CartDoc> = async (
    dto: CreateNewCartDto,
    user_id: string,
  ) => {
    if (!user_id) {
      return null;
    }
    try {
      const {
        info,
        original_price,
        quantity,
        thumbnail,
        total_price,
        varitants,
      } = dto;
      const existingCart = await this.cartModel.findOne({
        'info.product_id': new mongoose.Types.ObjectId(info.product_id),
      });
      const product = await this.productModel.findById(info.product_id);
      const newVaritants = {
        ...varitants,
        attributes: varitants.attributes.map((m) => ({
          ...m,
          other: product.varitants
            .find((f) => f.sku === varitants.sku)
            ?.attributes.find((f) => f.name === m.name)
            .value.filter((ft) => ft !== m.value),
        })),
      };
      console.log(existingCart);
      if (existingCart) {
        await this.updatePatch(
          {
            id: existingCart._id as string,
            attributes: varitants.attributes,
            quantity,
            sku: varitants.sku,
          },
          user_id,
        );
        await existingCart.save();
        return existingCart;
      }
      const newCart = await this.cartModel.create({
        user_id,
        info: {
          product_id: new mongoose.Types.ObjectId(info.product_id),
          name: info.name,
          slug: info.slug,
        },
        quantity,
        total_price: total_price ?? quantity * original_price,
        thumbnail,
        varitants: newVaritants,
        original_price,
      });
      if (!newCart) {
        return null;
      }
      return newCart;
    } catch (error) {
      console.log('cart repository error:', error as string);
      return null;
    }
  };
  /**
   * @param id
   * @returns
   */
  getByUserId: (id: string) => Promise<CartDoc[]> = async (id: string) => {
    if (!id) {
      return null;
    }
    try {
      const carts = await this.cartModel
        .find({ user_id: id })
        .sort({ createdAt: -1 })
        .lean<CartDoc[]>();
      return carts;
    } catch (error) {
      console.log('cart repository error:', error as string);
      return null;
    }
  };
  /**
   * Delete cart by id from param
   * @param id
   * @returns
   */
  delete: (id: string) => Promise<number> = async (id: string) => {
    try {
      await this.cartModel.findByIdAndDelete(id);
      return 1;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };
  /**
   *
   */
  updatePatch: (param: UpdateCartDto, user_id: string) => Promise<number> =
    async (param: UpdateCartDto, user_id: string) => {
      try {
        const cartData = await this.cartModel.findOne({
          _id: new mongoose.Types.ObjectId(param.id),
          user_id,
        });
        if (!cartData) {
          throw new BadRequestException(
            `cart with ${param.id} is not define in database!`,
          );
        }
        if (param.quantity) {
          cartData.total_price = cartData.original_price * param.quantity;
          cartData.quantity = param.quantity;
        }
        const product = await this.productModel.findById(
          cartData.info.product_id,
        );
        if (!product) {
          throw new BadRequestException(
            `product with ${String(cartData.info.product_id)} is not define`,
          );
        }

        if (param.attributes.length > 0) {
          const productVaritant = product.varitants.find(
            (f) => f.sku === param.sku,
          );
          if (!productVaritant) {
            throw new BadRequestException(
              `varitant with sku: ${param.sku} is not define!`,
            );
          }
          const attributes = param.attributes.map((attr) => ({
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
        return 1;
      } catch (error) {
        throw new InternalServerErrorException(`${error}`);
      }
    };
}
