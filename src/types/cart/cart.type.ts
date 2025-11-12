import mongoose from 'mongoose';
/**
 * cart request send product information
 */
export type CartProductInforRequest = {
  product_id: string;
  slug: string;
  name: string;
};
/**
 * type cart varitant attribute request
 */
export type CartVaritantAttributeRequest = {
  name: string;
  value: string;
};
/**
 * cart request send product varitant attribute
 */
export type CartProductVaritantRequest = {
  sku: string;
  attributes: CartVaritantAttributeRequest[];
};
/**
 * type of add to cart request
 */
export type CreateNewCartRequest = {
  info: CartProductInforRequest;
  varitants: CartProductVaritantRequest;
  quantity: number;
  total_price: number;
  original_price: number;
  thumbnail: string;
};
/**
 * type of cart varitant attribute finished handle
 */
export type CartVaritantAttributeFinishedHandle = {
  name: string;
  value: string;
  other: string[];
};
/**
 * type of cart varitant finished handle
 */
export type CartVaritantFinishedHandle = {
  sku: string;
  attributes: CartVaritantAttributeFinishedHandle[];
};
/**
 * type of cart list finished handle
 */
export type CartListFinishedHandle = {
  _id: mongoose.Types.ObjectId;
  info: CartProductInforRequest;
  varitants: CartVaritantFinishedHandle;
  quantity: number;
  total_price: number;
  original_price: number;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
};
/**
 * type of cart varitant attribute update request
 */
export type UpdateCartVaritantAttributeRequest = {
  name: string;
  value: string;
};
/**
 * type of cart varitant update request
 */
export type UpdateCartVaritantRequest = {
  sku: string;
  attributes: UpdateCartVaritantAttributeRequest[];
};
/**
 * type of cart update request
 */
export type UpdateCartRequest = {
  id: string;
  varitants?: UpdateCartVaritantRequest;
  quantity?: number;
};
