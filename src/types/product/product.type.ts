import mongoose from 'mongoose';
/**
 * type of query from url request
 */
export type GetProductByQueryRequest = {
  page: number;
  brand: string | undefined;
  max_price: number | undefined;
  min_price: number | undefined;
  max_sale: number | undefined;
  min_sale: number | undefined;
  category: string | undefined;
  location: string | undefined;
};
/**
 * type of product varitant attribute
 */
export type ProductVaritanAttributeFinishedHandle = {
  name: string;
  value: string[];
};
/**
 * type of product varitant
 */
export type ProductVaritantFinishedHandle = {
  sku: string;
  stoke: number;
  attributes: ProductVaritanAttributeFinishedHandle[];
};
/**
 * type of product owner information
 */
export type ProductOwnerInformationFinishedHandle = {
  seller_id: string;
  product_id: string;
};
/**
 * type of product infomation
 */
export type ProductInformationFinishedHandle = {
  name: string;
  slug: string;
  brand: string;
  category: string;
};
/**
 * type of product list when finished hanđle
 */
export type GetProductByQueryFinishedHandle = {
  _id: mongoose.Types.ObjectId;
  info: ProductInformationFinishedHandle;
  original_price: number;
  sale: number;
  rating: number;
  sold: string;
  isActive: boolean;
  thumbnail: string;
};
/**
 * type of single product when finished handle logic
 */
export type GetSingleProductFinishedHandle = {
  _id: mongoose.Types.ObjectId;
  info: ProductInformationFinishedHandle;
  varitants: ProductVaritantFinishedHandle[];
  original_price: number;
  sale: number;
  rating: number;
  sold: string;
  isActive: boolean;
  thumbnail: string;
  images: string[];
  tags: string[];
};
/**
 * type up new product information request
 */
export type CreateNewProductInformationRequest = {
  name: string;
  category: string;
  description: string;
  brand: string | undefined;
};
/**
 * type up new product varitant attribute
 */
export type CreateNewProductVaritantAttributeRequest = {
  name: string;
  value: string[];
  image: string | undefined;
};
/**
 * type of up new product varitant
 * request
 */
export type CreateNewProductVaritantRequest = {
  sku: string;
  stoke: number;
  attributes: CreateNewProductVaritantAttributeRequest[];
};
/**
 * type up new product request
 */
export type CreateNewProductRequest = {
  info: CreateNewProductInformationRequest;
  varitants: CreateNewProductVaritantRequest[];
  original_price: number;
  sale: number;
  thumbnail: string;
  images: string[];
};
/**
 *
 */
export type UpdateProductRequest = CreateNewProductRequest & {
  id: string;
};
