import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { ProductDoc } from "./models/product.model";
import mongoose, { isValidObjectId, Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  DeleteActionSingleProductDto,
  GetProductDto,
  getSingleProductDto,
  UpdateSingleProductDto,
} from "./dto/product.dto";

/**
 * Remember** lean()
 */

import { createSlug } from "src/feature/feature";
import { InjectRepository } from "@nestjs/typeorm";
import { StoreEntity } from "src/store/entity/store.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/users/entity/user.entity";

@Injectable()
export class ProductsService {
  constructor(
    //regist model
    @InjectModel("Product") private productModel: Model<ProductDoc>,

    //sql
    @InjectRepository(StoreEntity)
    private readonly storeRepo: Repository<StoreEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  /**
   * Get product for home page
   * get about 50 product for each page , limit is 50 skip is page * limit - limit
   * @param dto
   * @returns
   */
  async getHomeProductService(dto: { page: number }) {
    try {
      const api = await this.productModel
        .find()
        .select("proName proPrice proSlug proCateSlug proImg")
        .limit(50)
        .skip(
          Number(dto.page) * 50 - 50, //page * limit - limit
        )
        //chuyển sang js object
        .lean();
      return api;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * get product with query category
   * @param dto
   * @returns
   */
  async getProductShopService(dto: GetProductDto) {
    try {
      const storeQuery: { storeAreaSlug?: string } = {};

      if (dto.area) storeQuery.storeAreaSlug = dto.area;
      const proQuery: {
        proCateSlug?: string;
      } = {};

      if (dto.cate_slug) proQuery.proCateSlug = dto.cate_slug;
      const store = await this.storeRepo.find({ where: storeQuery });

      const api = await Promise.all(
        store.map(async (s) => {
          const pro = await this.productModel
            .find({
              storeId: s.storeId.toLowerCase(),
              ...proQuery,
              proPrice: dto.pro_price
                ? { $lte: Number(dto.pro_price) }
                : { $gte: 0 },
              proSale: dto.pro_sale
                ? { $lte: Number(dto.pro_sale) }
                : { $gte: 0 },
            })
            .lean();
          return {
            storeId: s.storeId,
            storeName: s.storeName,
            storeArea: s.storeArea,
            products: pro,
          };
        }),
      );
      return api;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   *
   * @returns
   */
  /**
   * get single products
   */
  async getSingleProductService(dto: getSingleProductDto) {
    try {
      if (!dto.id && !dto.slug) {
        throw new BadRequestException(`Vui lòng truyền tham số query`);
      }
      const product = await this.productModel.findOne({
        ...(dto &&
          (dto.id
            ? { _id: new mongoose.Types.ObjectId(dto.id) }
            : { proSlug: dto.slug })),
      });
      if (!product) {
        throw new BadRequestException("Product not define!");
      }
      const relatedProduct = await this.productModel
        .find({ _id: { $ne: product._id }, proCateSlug: product.proCateSlug })
        .select("proName proPrice proSlug proCateSlug proImg")
        .limit(12) // loại luôn product hiện tại
        .lean();
      return {
        product: product,
        related: relatedProduct,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * update product single
   * get product_id store_id and update dto with action delete or update
   */
  async updateSingleProductService(
    dto: UpdateSingleProductDto,
    storeId: string,
    sellerId: string,
  ) {
    try {
      if (!storeId || !dto.product_id) {
        throw new BadRequestException(`Store id and product id is not define!`);
      }
      console.log("dto:", dto);
      const proId = new Types.ObjectId(dto.product_id);

      //find this product
      const foundProduct = await this.productModel.findOne({
        _id: proId,
        storeId,
        sellerId,
      });

      console.log(foundProduct);

      if (!foundProduct) {
        throw new BadRequestException(
          "Product with this id not found in this store!",
        );
      }

      //Update info
      if (dto.proName) {
        foundProduct.proName = dto.proName;
        foundProduct.proSlug = createSlug(dto.proName);
      }
      if (dto.proPrice) foundProduct.proPrice = Number(dto.proPrice);
      if (dto.proDescription) foundProduct.proDescription = dto.proDescription;
      if (dto.proSale) foundProduct.proSale = Number(dto.proSale);
      if (dto.proImg) foundProduct.proImg = dto.proImg;
      if (dto.proCateSlug) foundProduct.proCateSlug = dto.proCateSlug;

      //Update attribute
      if (dto.attribute) {
        const oldAttrs = foundProduct.proAttributes ?? [];
        dto.attribute.forEach((attr, indexOfAttr) => {
          if (isValidObjectId(attr._id)) {
            const existingAttr =
              oldAttrs.find((f) => attr._id.toString() === f._id.toString()) ??
              oldAttrs[indexOfAttr];
            if (existingAttr && attr.attrName) {
              existingAttr.attrName =
                attr.attrName !== existingAttr.attrName
                  ? attr.attrName
                  : existingAttr.attrName;
              /**
               * chỉ cập nhật item khi có item được gửi theo
               */
              if (attr.items) {
                attr.items.forEach((item, indexOfItem) => {
                  if (isValidObjectId(item._id)) {
                    const existingItem =
                      existingAttr.items.find(
                        (f) => f._id.toString() === item._id.toString(),
                      ) ?? existingAttr.items[indexOfItem];

                    if (existingItem && item.itemValue) {
                      /**
                       * Khác mới đổi không thì thôi
                       */
                      //value item
                      existingItem.itemValue =
                        item.itemValue !== existingItem.itemValue
                          ? item.itemValue
                          : existingItem.itemValue;
                      //img item
                      existingItem.itemImg =
                        item.itemImg !== existingItem.itemImg
                          ? item.itemImg
                          : existingItem.itemImg;
                    }
                    // tạo mới khi id khác kiểu objectId
                  } else {
                    existingAttr.items.push({
                      _id: new Types.ObjectId(),
                      itemValue: item.itemValue ?? "unknown",
                      itemImg: item.itemImg ?? "",
                    });
                  }
                });
              }
            }
            // tạo mới khi id khác kiểu objectId
          } else {
            const newAttr = {
              _id: new Types.ObjectId(),
              attrName: attr.attrName ?? "unknown",
              items: (attr.items ?? []).map((i) => ({
                _id: new Types.ObjectId(),
                itemValue: i.itemValue ?? "unknown",
                itemImg: i.itemImg ?? "",
              })),
            };
            oldAttrs.push(newAttr);
          }
        });

        foundProduct.proAttributes = oldAttrs;
      }
      //update img detail
      if (dto.imgDetail) {
        const oldImgDetails = foundProduct.proImgDetails ?? [];
        dto.imgDetail.forEach((img) => {
          if (isValidObjectId(img._id)) {
            const thisImg = oldImgDetails.find(
              (fImg) => fImg._id.toString() === img._id?.toString(),
            );
            if (thisImg) {
              thisImg.imgUrl = img.imgUrl ?? "";
            }
          } else {
            oldImgDetails.push({
              _id: new Types.ObjectId(),
              imgUrl: img.imgUrl ?? "",
            });
          }
        });
        foundProduct.proImgDetails = oldImgDetails;
      }

      await foundProduct.save();

      return { message: "Product updated successfully" };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }

  /**
   * delete product action, client send _id and name model to server
   * find and delete
   * model:product,attribute,imgdetail
   */
  async deleteActionSingleProductService(
    dto: DeleteActionSingleProductDto,
    sellerId: string,
  ) {
    try {
      const proId = new mongoose.Types.ObjectId(dto.proId);
      if (!proId) {
        throw new BadRequestException("No product id request!");
      }
      const thisProduct = await this.productModel.findOne({
        _id: new mongoose.Types.ObjectId(proId),
        sellerId,
      });
      if (!thisProduct) {
        throw new BadRequestException("Product not existed in database!");
      }
      //delete attribute
      if (dto.attribute) {
        dto.attribute.forEach((attr) => {
          const attributeId = new mongoose.Types.ObjectId(attr._id);
          if (!attributeId) {
            throw new Error("attribute not existed this id!");
          }
          const updatedProductAttribute = thisProduct.proAttributes.filter(
            (ft) => !ft._id.equals(attributeId),
          );
          thisProduct.proAttributes = updatedProductAttribute;
        });
      }
      //delete item
      if (dto.attributeItem) {
        dto.attributeItem.forEach((attrItem) => {
          const thisParent = thisProduct.proAttributes.find((f) =>
            f._id.equals(new mongoose.Types.ObjectId(attrItem.attrId)),
          );
          if (!thisParent) {
            throw new Error("Not found this attribute!");
          }
          const updatedItem = thisParent.items.filter(
            (fti) => !fti._id.equals(new mongoose.Types.ObjectId(attrItem._id)),
          );
          thisParent.items = updatedItem;
        });
      }
      //delete img detail
      if (dto.imgDetail) {
        dto.imgDetail.forEach((img) => {
          const thisImgDetail = thisProduct.proImgDetails.filter(
            (f) => !f._id.equals(new mongoose.Types.ObjectId(img._id)),
          );
          if (!thisImgDetail) {
            throw new Error("Not found this img detail");
          }
          thisProduct.proImgDetails = thisImgDetail;
        });
      }
      await thisProduct.save();
      return { message: "Đã thành công", resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   *
   * Test
   */
  async tesfunction(
    data: {
      proCateSlug: string;
      proName: string;
      proTag: string;
      storeId: string;
      sellerId: string;
      proSlug: string;
      proPrice: number;
      proSale: number;
      proImg: string;
      proDescription: string;
      proAttributes: {
        attrName: string;
        items: { itemValue: string; itemImg: string }[];
      }[];
      proImgDetails: {
        imgUrl: string;
      }[];
    }[],
    sellerId: string,
    storeId: string,
  ) {
    for (const d of data) {
      await this.productModel.create({
        proName: d.proName,
        proPrice: d.proPrice,
        proCateSlug: d.proCateSlug,
        proImg: d.proImg,
        proDescription: d.proDescription,
        proSale: d.proSale,
        proSlug: d.proSlug,
        proTag: d.proTag,
        sellerId: sellerId,
        storeId: storeId,
        proImgDetails:
          d.proImgDetails?.map((img) => ({
            _id: new Types.ObjectId(),
            imgUrl: img.imgUrl ?? "",
          })) ?? [],
        proAttributes:
          d.proAttributes?.map((attr) => ({
            _id: new Types.ObjectId(),
            attrName: attr.attrName,
            items:
              attr.items?.map((item) => ({
                _id: new Types.ObjectId(),
                itemValue: item.itemValue,
                itemImg: item.itemImg,
              })) ?? [],
          })) ?? [],
      });
    }
    return { message: "test thành công!" };
  }
}
