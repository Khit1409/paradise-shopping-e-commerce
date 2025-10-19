/**
 * Inteface get all product
 */
export interface GetProductByCategoryRequest {
  page: number;
}
/**
 *
 */
/**
 * Interface api product when server response data
 *
 *
 */

export interface Categories {
  _id: string;
  storeId: number;
  cateName: string;
  cateSlug: string;
  cateImg: string;
}
/**
 * Product global type
 */
export interface Product {
  _id: string;
  cateId: string;
  proName: string;
  proPrice: number;
  proSale: number;
  proTag: string;
  proSlug: string;
  proImg: string;
  proDescription: string;
  createdAt: string;
  updatedAt: string;
}
export interface ImgDetail {
  _id: string;
  proId: string;
  imgUrl: string;
  __v: number;
}
export interface Attribute {
  _id: string;
  proId: string;
  attrName: string;
  __v: number;
  items: AttributeItem[];
}
export interface AttributeItem {
  _id: string;
  attrId: string;
  itemValue: string;
  itemImg?: string;
  __v: number;
}
/**
 * Single product type when api response
 */
export interface SingelProductDataResponse {
  product: SingleProduct;
  related: Product[];
}
/**
 * Product for single product
 */
export interface SingleProduct {
  _id: string;
  cateId: string;
  proName: string;
  proSale: number;
  proPrice: number;
  proTag: string;
  proSlug: string;
  proImg: string;
  proDescription: string;
  proImgDetails: ImgDetail[];
  proAttributes: Attribute[];
  createdAt: string;
  updatedAt: string;
}
/**
 * Product for shop page
 */
export interface ProductShopPage {
  storeId: number;
  storeName: string;
  storeArea: string;
  storeAreaSlug: string;
  storeAvatar: string;
  storeAddress: string;
  products: {
    _id: string;
    cateId: string;
    proName: string;
    proPrice: number;
    proSale: number;
    proTag: string;
    proSlug: string;
    proImg: string;
  }[];
}
/**
 * cart api response
 */
export type UserCart = {
  _id: string;
  cartName: string;
  cartPrice: number;
  cartQuantity: number;
  cartImg: string;
}[];
