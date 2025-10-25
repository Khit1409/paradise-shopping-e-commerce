import { CreatePaymentLinkResponse } from "@payos/node";
import mongoose from "mongoose";
/**
 * normal response
 */
export type NormalHandleResponse = {
  message: string;
  resultCode: number;
  statusCode: number;
};
/**
 * ========================
 * TYPE OF APP API RESPONSE
 * ========================
 */
/**
 * type of Navigation api response
 */
export interface NavigationDataType {
  _id: string;
  navName: string;
  navIcon?: string;
  navUrl: string;
}
/**
 * final type of navigation response
 */
export type NavigationReponse = {
  nav: NavigationDataType[];
  message: string;
  resultCode: number;
  statusCode: number;
};
/**
 * =============================
 * TYPE OF PRODUCT API RESPONSE
 * ============================
 */
/**
 * product preview data type
 */
export type ProductPreviewDataType = {
  _id: string;
  cateId: string;
  proName: string;
  proPrice: number;
  proSale: number;
  proTag: string;
  proSlug: string;
  proImg: string;
};
/**
 * Product home page api
 */
export type ProductHomeDataType = {
  _id: string;
  cateId: string;
  proName: string;
  proPrice: number;
  proSale: number;
  proTag: string;
  proSlug: string;
  proImg: string;
};
/**
 * final type of product home page response
 */
export type ProductHomePageResponse = {
  message: string;
  resultCode: number;
  statusCode: number;
  api: ProductPreviewDataType[];
};
/**
 * product shop page type
 */
export type ProductShopPageDataType = {
  storeId: string;
  storeName: string;
  storeArea: string;
  products: ProductPreviewDataType[];
};
/**
 * final type product shop page response
 */

export type ProductShopPageResponse = {
  message: string;
  resultCode: number;
  statusCode: number;
  api: ProductShopPageDataType[];
};
/**
 * single product type
 */

//attribute item type
export type AttributeItem = {
  _id: string;
  attrId: string;
  itemValue: string;
  itemImg?: string;
};
//attribute type
export type Attribute = {
  _id: string;
  proId: string;
  attrName: string;
  items: AttributeItem[];
};
//img detail type
export type ImgDetail = {
  _id: string;
  proId: string;
  imgUrl: string;
};
// api type
export type SingleProductDataType = {
  _id: string;
  cateId: string;
  proName: string;
  proSale: number;
  proPrice: number;
  storeId: string;
  sellerId: string;
  proTag: string;
  proSlug: string;
  proCateSlug: string;
  proImg: string;
  proDescription: string;
  proImgDetails: ImgDetail[];
  proAttributes: Attribute[];
};
/**
 * final product single api response
 */
export type SingleProductResponse = {
  message: string;
  resultCode: number;
  statusCode: number;
  api: {
    product: SingleProductDataType;
    related: ProductPreviewDataType[];
  };
};
/**
 * =========================
 * TYPE OF USER API RESPONSE
 * =========================
 */
//=== user address type ===//
export type UserAddressDataType = {
  _id: mongoose.Types.ObjectId;
  addressName: string;
};
//=== user email type ===//
export type UserEmailDataType = {
  _id: mongoose.Types.ObjectId;
  emailAddress: string;
};
//===user phone type ===//
export type UserPhoneDataType = {
  _id: mongoose.Types.ObjectId;
  phoneNum: string;
};
/**
 * User data response form authentication service
 */
export type UserDataType = {
  /**
   * user information form SQL server
   */
  userId: string;
  userFirtName: string;
  userLastName: string;
  userEmail: string;
  userPhone: string;
  userStore: string | null;
  userRole: "user" | "seller";
  userAvatar: string | null;
  /**
   * User information from mongooDB
   */
  userAddress: UserAddressDataType[] | null;
  userOtherPhone: UserPhoneDataType[] | null;
  userOtherEmail: UserEmailDataType[] | null;
};
/**
 * Authentication response type
 */
export type AuthenticationReponse = {
  message: string;
  resultCode: number;
  api: UserDataType;
  statusCode: number;
};
/**
 * =======================
 * TYPE OF ORDER RESPONSE
 * =======================
 */
export type AddNewOrderResponse = {
  message: string;
  resultCode: number;
  payment: CreatePaymentLinkResponse | null;
  statusCode: number;
};
