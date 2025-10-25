import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { isValidObjectId, Model, Types } from "mongoose";
import { getProductSellerDto } from "./dto/store-get-product.dto";
import { Product } from "src/products/models/product.model";
import { createSlug } from "src/feature/feature";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
import { NormalHandleResponse } from "src/interfaces/server.types";
import { UpNewProductDto } from "./dto/store-create-new-product.dto";
import { UpdateSingleProductDto } from "./dto/store-update-product.dto";
import { DeleteActionSingleProductDto } from "./dto/store-delete-product.dto";
@Injectable()
export class StoreService {
  constructor(
    //models
    @InjectModel("Product")
    private readonly productModel: Model<Product>,
    //config service
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    //repo
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  /**
   * @param dto
   * @returns
   */
  async getProductSellerService(dto: getProductSellerDto, sellerId: string) {
    try {
      if (!sellerId) {
        throw new BadRequestException("Seller id không được gửi!");
      }
      //get data
      const storeProData = await this.productModel
        .find({
          sellerId: sellerId,
        })
        .lean();
      //return
      return storeProData;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   *
   * @param dto
   * @returns
   */
  async getSingleProductSellerService(product_id: string, sellerId: string) {
    try {
      if (!product_id || !sellerId) {
        throw new BadRequestException("Lỗi truyền tham số");
      }
      const product = await this.productModel
        .findOne({
          _id: new mongoose.Types.ObjectId(product_id),
          sellerId,
        })
        .select("-createdAt -updatedAt -__v -sellerId -storeId");
      if (!product) {
        throw new Error("Product not found!");
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   *
   * @param dto
   * @returns
   */
  async upNewProduct(dto: UpNewProductDto, sellerId: string, storeId: string) {
    try {
      //new product
      const result = await this.productModel.create({
        proName: dto.name,
        proDescription: dto.description,
        proImg: dto.img,
        proCateSlug: dto.cate_slug,
        proSale: Number(dto.sale),
        proPrice: Number(dto.price),
        proSlug: createSlug(dto.name),
        proTag: dto.hashtag,
        sellerId: sellerId,
        storeId: storeId,
        //tạo phân loại hàng
        proAttributes: dto.attribute
          ? dto.attribute.map((attr) => ({
              _id: new Types.ObjectId(),
              attrName: attr.name,
              items: attr.item
                ? attr.item.map((item) => ({
                    _id: new Types.ObjectId(),
                    itemValue: item.value,
                    itemImg: item.img ?? "",
                  }))
                : [],
            }))
          : [],
        //tạo ảnh chi tiết
        proImgDetails: dto.imgDetail
          ? dto.imgDetail.map((img) => ({
              _id: new Types.ObjectId(),
              imgUrl: img.imgUrl ?? "",
            }))
          : [],
      });

      if (!result) {
        return { message: "Failed", resultCode: 0 };
      }
      return { message: "Successfull!", resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * update product single
   * get product_id store_id and update dto with action delete or update
   * @param dto
   * @param storeId
   * @param sellerId
   * @returns
   */
  async updateSingleProductService(
    dto: UpdateSingleProductDto,
    storeId: string,
    sellerId: string
  ): Promise<NormalHandleResponse> {
    try {
      //check validate
      if (!storeId || !dto.product_id) {
        throw new BadRequestException(`Store id and product id is not define!`);
      }
      //set proid
      const proId = new Types.ObjectId(dto.product_id);

      //find this product
      const foundProduct = await this.productModel.findOne({
        _id: proId,
        storeId,
        sellerId,
      });
      if (!foundProduct) {
        throw new BadRequestException(
          "Product with this id not found in this store!"
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
                        (f) => f._id.toString() === item._id.toString()
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
              (fImg) => fImg._id.toString() === img._id?.toString()
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

      //save
      await foundProduct.save();

      //response
      return {
        message: "Product updated successfully",
        resultCode: 1,
        statusCode: 200,
      };
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
    sellerId: string
  ): Promise<NormalHandleResponse> {
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
            (ft) => !ft._id.equals(attributeId)
          );
          thisProduct.proAttributes = updatedProductAttribute;
        });
      }
      //delete item
      if (dto.attributeItem) {
        dto.attributeItem.forEach((attrItem) => {
          const thisParent = thisProduct.proAttributes.find((f) =>
            f._id.equals(new mongoose.Types.ObjectId(attrItem.attrId))
          );
          if (!thisParent) {
            throw new Error("Not found this attribute!");
          }
          const updatedItem = thisParent.items.filter(
            (fti) => !fti._id.equals(new mongoose.Types.ObjectId(attrItem._id))
          );
          thisParent.items = updatedItem;
        });
      }
      //delete img detail
      if (dto.imgDetail) {
        dto.imgDetail.forEach((img) => {
          const thisImgDetail = thisProduct.proImgDetails.filter(
            (f) => !f._id.equals(new mongoose.Types.ObjectId(img._id))
          );
          if (!thisImgDetail) {
            throw new Error("Not found this img detail");
          }
          thisProduct.proImgDetails = thisImgDetail;
        });
      }
      //save
      await thisProduct.save();
      //response
      return { message: "Đã thành công", resultCode: 1, statusCode: 200 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
