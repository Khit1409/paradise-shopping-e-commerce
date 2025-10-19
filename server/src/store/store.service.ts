import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Types } from "mongoose";
import {
  getProductSellerDto,
  getSingleProductSellerDto,
} from "./dto/store.dto";
import { Product } from "src/products/models/product.model";
import { UpProductDto } from "src/products/dto/product.dto";
import { createSlug } from "src/feature/feature";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
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
    private readonly userRepo: Repository<UserEntity>,
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
  async getSingleProductSellerService(
    dto: getSingleProductSellerDto,
    sellerId: string,
  ) {
    try {
      if (!dto.product_id || !sellerId) {
        throw new BadRequestException("Lỗi truyền tham số");
      }
      const product = await this.productModel
        .findOne({
          _id: new mongoose.Types.ObjectId(dto.product_id),
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
  async upNewProduct(dto: UpProductDto, sellerId: string, storeId: string) {
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
}
