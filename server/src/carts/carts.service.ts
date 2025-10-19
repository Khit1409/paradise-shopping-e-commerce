import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { cartDoc } from "./model/cart.model";
import { AddToCartDto } from "./dto/cart-create.dto";
import { UpdateUserCartDto } from "./dto/cart-update.dto";
import { ProductDoc } from "src/products/models/product.model";

/**
 * 1. add to cart ok
 * 2. get cart for user ok
 * 3. update remove
 */
@Injectable()
export class CartsService {
  constructor(
    @InjectModel("Cart") private readonly cartModel: Model<cartDoc>,
    @InjectModel("Product") private readonly productModel: Model<ProductDoc>,
  ) {}

  /**
   * function add to cart
   * update quantity if is old product
   * create new if new product
   * @param dto
   * @returns
   */
  async addToCartServicer(dto: AddToCartDto, userId: string) {
    try {
      if (!dto.proId) {
        throw new BadRequestException("Not found proId");
      }
      if (!userId) {
        throw new BadRequestException("Not found userId");
      }
      const productAdded = await this.productModel.findOne({
        _id: new mongoose.Types.ObjectId(dto.proId),
      });
      if (!productAdded) {
        throw new Error("Product is not define in database!");
      }
      //update if existed product id and userid in database
      const updatedCart = await this.cartModel.findOneAndUpdate(
        {
          proId: new mongoose.Types.ObjectId(dto.proId),
          userId,
        },
        {
          $inc: {
            cartQuantity: +Number(dto.quantity),
            cartTotalPrice: +Number(dto.price * dto.quantity),
          }, //update quantity
        },
        { new: true },
      );
      //create if new
      if (!updatedCart) {
        const productAttribute = productAdded.proAttributes;
        console.log(productAttribute);
        const newCart = await this.cartModel.create({
          userId: userId,
          proId: new mongoose.Types.ObjectId(dto.proId),
          cartImg: dto.img,
          cartName: dto.name,
          cartTotalPrice: Number(dto.price * dto.quantity),
          cartPrice: Number(dto.price),
          cartQuantity: dto.quantity ? Number(dto.quantity) : 1,
          cartAttributes: dto.choose
            ? dto.choose.map((attr) => ({
                _id: new mongoose.Types.ObjectId(),
                attrName: attr.attrName,
                itemValue: attr.itemValue,
                otherValue: (() => {
                  const neededAttr = productAttribute.find(
                    (f) => f.attrName === attr.attrName, //other value,
                  );
                  if (neededAttr) {
                    const neededItem = neededAttr.items.filter(
                      (ft) => ft.itemValue !== attr.itemValue,
                    );
                    return neededItem.map((r) => ({ value: r.itemValue }));
                  } else {
                    return [];
                  }
                })(),
              }))
            : [], //cartAttribute,
        });

        if (!newCart) {
          throw new BadRequestException("Can not create new cart!");
        }

        return { message: "Succesful", resultCode: 1 };
      }

      return { message: "Succesful", resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }

  /**
   * function update attribute  or quantity in cart page
   */
  async updateUserCart(dto: UpdateUserCartDto, userId: string) {
    try {
      if (!userId) {
        throw new BadRequestException("Error when get userId from token!");
      }

      const existedCart = await this.cartModel.findById(
        new mongoose.Types.ObjectId(dto.cartId),
      );
      if (!existedCart) {
        throw new BadRequestException("Error when update user cart!");
      }

      if (dto.newQuantity) existedCart.cartQuantity = Number(dto.newQuantity);
      if (dto.newAttributes) {
        console.log(dto.newAttributes);
        dto.newAttributes.forEach((attr) => {
          const thisAttr = existedCart.cartAttributes.find(
            (f) => f._id.toString() === attr._id,
          );
          if (thisAttr) {
            thisAttr.attrName = attr.attrName ?? thisAttr.attrName;
            thisAttr.itemValue = attr.itemValue ?? thisAttr.itemValue;
          }
        });
      }
      await existedCart.save();

      return { message: "successfull!", resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * get cart by user id
   * @param dto
   * @returns
   */
  async getCartByUserIdService(userId: string) {
    try {
      if (!userId) {
        throw new BadRequestException("user id is not define!");
      }
      const cart = await this.cartModel
        .find({ userId })
        .select(
          "cartName cartImg cartAttributes cartPrice cartTotalPrice proId cartQuantity",
        )
        .lean();

      return cart as [];
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * update cart by id user id and cart id
   */
  async deleteCartUserService(id: string, userId: string) {
    try {
      const cartId = new mongoose.Types.ObjectId(id);
      if (!cartId || !userId) {
        throw new BadRequestException("Lỗi request thiếu field");
      }

      await this.cartModel.findByIdAndDelete({ _id: cartId, userId });

      return { message: "Xóa giỏ hàng thành công!", resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
