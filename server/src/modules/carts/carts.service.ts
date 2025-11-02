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
import { ProductDoc } from"@/modules/products/models/product.model";
import { UserCartDataType } from"@/interfaces/server.types";

/**
 * 1. add to cart ok
 * 2. get cart for user ok
 * 3. update remove
 */
@Injectable()
export class CartsService {
  constructor(
    @InjectModel("Cart") private readonly cartModel: Model<cartDoc>,
    @InjectModel("Product") private readonly productModel: Model<ProductDoc>
  ) {}

  /**
   * function add to cart
   * update quantity if is old product
   * create new if new product
   * @param dto
   * @returns
   */
  async addToCart(dto: AddToCartDto, userId: string) {
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
      const existedCart = await this.cartModel.findOne({
        proId: new mongoose.Types.ObjectId(dto.proId),
        userId,
      });
      /**
       * update if existed product id
       */
      if (existedCart) {
        const newAttribute = [...existedCart.cartAttributes];
        for (const attrDto of dto.choose) {
          for (const attrEx of newAttribute) {
            if (attrEx.attrName === attrDto.attrName) {
              const newOtherValue: { value: string }[] = [];
              for (const proAttr of productAdded.proAttributes) {
                if (proAttr.attrName === attrDto.attrName) {
                  /**
                   * fillter diffirent itemValue
                   */
                  const diffItemValue = proAttr.items.filter(
                    (ft) => ft.itemValue !== attrDto.itemValue
                  );
                  for (const newItemValue of diffItemValue) {
                    /**
                     * update orther value, name and itemValue
                     * if
                     * dto attrName === exitedCart attrName
                     * and dto item !== existed item
                     * => update new item = dto itemValue
                     */
                    newOtherValue.push({
                      value: newItemValue.itemValue,
                    });
                    attrEx.attrName = attrDto.attrName;
                    attrEx.itemValue = attrDto.itemValue;
                    attrEx.otherValue = newOtherValue;
                  }
                }
              }
            }
          }
        }

        Object.assign(existedCart, {
          ...existedCart,
          cartQuantity: existedCart.cartQuantity + Number(dto.quantity),
          cartTotalPrice: Number(
            dto.price * (existedCart.cartQuantity + Number(dto.quantity))
          ),
          cartAttribute: newAttribute,
        });

        await existedCart.save();
      }
      //create if new
      if (!existedCart) {
        const productAttribute = productAdded.proAttributes;
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
                    (f) => f.attrName === attr.attrName //other value,
                  );
                  if (neededAttr) {
                    const neededItem = neededAttr.items.filter(
                      (ft) => ft.itemValue !== attr.itemValue
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
        new mongoose.Types.ObjectId(dto.cartId)
      );
      if (!existedCart) {
        throw new BadRequestException("Error when update user cart!");
      }

      if (dto.newQuantity) existedCart.cartQuantity = Number(dto.newQuantity);
      if (dto.newAttributes) {
        dto.newAttributes.forEach((attr) => {
          const thisAttr = existedCart.cartAttributes.find(
            (f) => f._id.toString() === attr._id
          );
          if (!thisAttr) {
            throw new BadRequestException(
              "This attribute of cart is not define"
            );
          }
          const neededAttr = existedCart.cartAttributes.find(
            (ft) => ft.attrName === attr.attrName
          );
          if (!neededAttr) {
            throw new BadRequestException(
              "need attribute of old cart is not define"
            );
          }
          const newOtherValue = neededAttr.otherValue.filter(
            (ft) => ft.value !== attr.itemValue
          );
          if (attr.attrName) thisAttr.attrName = attr.attrName;
          if (attr.itemValue) thisAttr.itemValue = attr.itemValue;
          thisAttr.otherValue = newOtherValue;
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
  async getCartByUserId(userId: string): Promise<UserCartDataType[]> {
    try {
      if (!userId) {
        throw new BadRequestException("user id is not define!");
      }
      const cart = await this.cartModel
        .find({ userId })
        .select(
          "cartName cartImg cartAttributes cartPrice cartTotalPrice proId cartQuantity"
        )
        .lean<UserCartDataType[]>();
      return cart;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * update cart by id user id and cart id
   */
  async deleteUserCart(id: string, userId: string) {
    try {
      if (id === "all") {
        await this.cartModel.deleteMany({ userId });
        return { message: "Xóa giỏ hàng thành công!", resultCode: 1 };
      }
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
