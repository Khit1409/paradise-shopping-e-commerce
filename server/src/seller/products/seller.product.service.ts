import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { isValidObjectId, Model } from "mongoose";
import { createSlug } from "src/feature/feature";
import {
  ProductPreviewDataType,
  SingleProductDataType,
} from "src/interfaces/server.types";
import { Product, ProductDoc } from "src/products/models/product.model";
import { UpNewProductDto } from "./dto/create-dto.dto";
import {
  UpdateProductPartDto,
  UpdateSingleProductAttributeDto,
  UpdateSingleProductImgDetailDto,
} from "./dto/update-dto.dto";
import {
  DeleteAttribute,
  DeleteAttributeItem,
  DeleteImageDetail,
  DeleteProductPartDto,
} from "./dto/delete-dto.dto";
/**
 *
 */
export class sellerProductService {
  constructor(
    @InjectModel("Product") private readonly productModel: Model<ProductDoc>
  ) {}
  /**
   * create new product
   * @param dto
   * @returns
   */
  async upNewProduct(dto: UpNewProductDto, sellerId: string, storeId: string) {
    try {
      console.log(dto.attribute);
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
        proAttributes: dto.attribute.map((attr) => ({
          _id: new mongoose.Types.ObjectId(),
          attrName: attr.attrName,
          items: attr.items.map((item) => ({
            _id: new mongoose.Types.ObjectId(),
            itemValue: item.itemValue,
            itemImg: item.itemImg ?? "",
          })),
        })),
        //tạo ảnh chi tiết
        proImgDetails: dto.imgDetail
          ? dto.imgDetail.map((img) => ({
              _id: new mongoose.Types.ObjectId(),
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
   * Get all product of seller
   * @param sellerId
   * @returns
   */
  async getProducts(sellerId: string) {
    try {
      const products = await this.productModel
        .find({ sellerId })
        .lean<ProductPreviewDataType[]>();
      console.log(products);
      return products;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * get single product by seller id and product id
   * @param id
   * @param sellerId
   */
  async getSingleProduct(sellerId: string, id: string) {
    try {
      const product = await this.productModel
        .findOne({ sellerId, _id: new mongoose.Types.ObjectId(id) })
        .select("-storeId -sellerId -__v -createdAt -updatedAt")
        .lean<SingleProductDataType>();
      return product;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * delete product attribute
   * @param attribute
   * @param proId
   */
  async deleteProductAttribute(
    attribute: DeleteAttribute[],
    productData: mongoose.Document<unknown, {}, ProductDoc, {}, {}> &
      Product &
      mongoose.Document<unknown, any, any, Record<string, any>, {}> &
      Required<{
        _id: unknown;
      }> & {
        __v: number;
      }
  ) {
    try {
      attribute.forEach((attr) => {
        const attributeId = new mongoose.Types.ObjectId(attr._id);
        if (!attributeId) {
          throw new Error("attribute not existed this id!");
        }
        const updatedProductAttribute = productData.proAttributes.filter(
          (ft) => !ft._id.equals(attributeId)
        );
        productData.proAttributes = updatedProductAttribute;
      });
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * delete product attribute item
   * @param attribute
   * @param proId
   */
  async deleteProductAttributeItem(
    attributeItem: DeleteAttributeItem[],
    productData: mongoose.Document<unknown, {}, ProductDoc, {}, {}> &
      Product &
      mongoose.Document<unknown, any, any, Record<string, any>, {}> &
      Required<{
        _id: unknown;
      }> & {
        __v: number;
      }
  ) {
    try {
      attributeItem.forEach((attrItem) => {
        const thisParent = productData.proAttributes.find((f) =>
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
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * delete product img detail
   * @param imgDetail
   * @param productData
   */
  async deleteProductImgDetail(
    imgDetail: DeleteImageDetail[],
    productData: mongoose.Document<unknown, {}, ProductDoc, {}, {}> &
      Product &
      mongoose.Document<unknown, any, any, Record<string, any>, {}> &
      Required<{
        _id: unknown;
      }> & {
        __v: number;
      }
  ) {
    try {
      imgDetail.forEach((img) => {
        const thisImgDetail = productData.proImgDetails.filter(
          (f) => !f._id.equals(new mongoose.Types.ObjectId(img._id))
        );
        if (!thisImgDetail) {
          throw new Error("Not found this img detail");
        }
        productData.proImgDetails = thisImgDetail;
      });
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * delete part of product
   * @param dto
   * @param proId
   * @param sellerId
   */
  async deleteProductPart(
    proId: string,
    value: DeleteProductPartDto,
    sellerId: string
  ) {
    const { attribute, attributeItem, imgDetail } = value;
    try {
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
      if (attribute) {
        await this.deleteProductAttribute(attribute, thisProduct);
      }
      //delete item
      if (attributeItem) {
        await this.deleteProductAttributeItem(attributeItem, thisProduct);
      }
      //delete img detail
      if (imgDetail) {
        await this.deleteProductImgDetail(imgDetail, thisProduct);
      }
      //save
      await thisProduct.save();
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * Delete product in database by id and seller id
   * @param id
   * @param sellerId
   * @returns
   */
  async deleteProduct(id: string, sellerId: string) {
    try {
      await this.productModel.deleteOne({ _id: id, sellerId });
      return { message: "deleted!", resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * update product attribute
   * @param productData
   * @param attribute
   */
  async updateAttribute(
    productData: mongoose.Document<unknown, {}, ProductDoc, {}, {}> &
      Product &
      mongoose.Document<unknown, any, any, Record<string, any>, {}> &
      Required<{
        _id: unknown;
      }> & {
        __v: number;
      },
    attribute: UpdateSingleProductAttributeDto[]
  ) {
    try {
      const oldAttrs = productData.proAttributes ?? [];
      attribute.forEach((attr, indexOfAttr) => {
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
                    _id: new mongoose.Types.ObjectId(),
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
            _id: new mongoose.Types.ObjectId(),
            attrName: attr.attrName ?? "unknown",
            items: (attr.items ?? []).map((i) => ({
              _id: new mongoose.Types.ObjectId(),
              itemValue: i.itemValue ?? "unknown",
              itemImg: i.itemImg ?? "",
            })),
          };
          oldAttrs.push(newAttr);
        }
      });
      productData.proAttributes = oldAttrs;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * update product image detail
   * @param productData
   * @param imgDetail
   */
  async updateImageDetail(
    productData: mongoose.Document<unknown, {}, ProductDoc, {}, {}> &
      Product &
      mongoose.Document<unknown, any, any, Record<string, any>, {}> &
      Required<{
        _id: unknown;
      }> & {
        __v: number;
      },
    imgDetail: UpdateSingleProductImgDetailDto[]
  ) {
    try {
      const oldImgDetails = productData.proImgDetails ?? [];
      imgDetail.forEach((img) => {
        if (isValidObjectId(img._id)) {
          const thisImg = oldImgDetails.find(
            (fImg) => fImg._id.toString() === img._id?.toString()
          );
          if (thisImg) {
            thisImg.imgUrl = img.imgUrl ?? "";
          }
        } else {
          oldImgDetails.push({
            _id: new mongoose.Types.ObjectId(),
            imgUrl: img.imgUrl ?? "",
          });
        }
      });
      productData.proImgDetails = oldImgDetails;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * update part of product
   * @param value
   * @param storeId
   * @param sellerId
   */
  async updateProductPart(
    id: string,
    value: UpdateProductPartDto,
    storeId: string,
    sellerId: string
  ) {
    const {
      proImg,
      attribute,
      imgDetail,
      proCateSlug,
      proDescription,
      proName,
      proPrice,
      proSale,
    } = value;
    try {
      //check validate
      if (!storeId || !id) {
        throw new BadRequestException(`Store id and product id is not define!`);
      }
      //set proid
      const proId = new mongoose.Types.ObjectId(id);

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
      if (proName) {
        foundProduct.proName = proName;
        foundProduct.proSlug = createSlug(proName);
      }
      if (proPrice) foundProduct.proPrice = Number(proPrice);
      if (proDescription) foundProduct.proDescription = proDescription;
      if (proSale) foundProduct.proSale = Number(proSale);
      if (proImg) foundProduct.proImg = proImg;
      if (proCateSlug) foundProduct.proCateSlug = proCateSlug;

      //Update attribute
      if (attribute) {
        await this.updateAttribute(foundProduct, attribute);
      }
      //update img detail
      if (imgDetail) {
        await this.updateImageDetail(foundProduct, imgDetail);
      }

      //save
      await foundProduct.save();
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
  /**
   * user update product part and delete product part
   * @param id
   * @param body
   * @param storeId
   * @param sellerId
   * @returns
   */
  async updateProduct(
    id: string,
    body: {
      updateValue: UpdateProductPartDto;
      deleteValue: DeleteProductPartDto;
    },
    storeId: string,
    sellerId: string
  ) {
    const { updateValue, deleteValue } = body;
    try {
      await Promise.all([
        await this.deleteProductPart(id, deleteValue, sellerId),
        await this.updateProductPart(id, updateValue, storeId, sellerId),
      ]);
      return { message: "ok!", resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
