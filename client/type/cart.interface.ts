/**
 * type of varitant attribute request
 */
export type CartVaritantAttributeRequest = {
  name: string;
  value: string;
};
/**
 * type of varitant request
 */
export type CartVaritantRequest = {
  sku: string;
  attributes: CartVaritantAttributeRequest[];
};
/**
 * type of add to cart
 */
export type AddToCartRequest = {
  info: {
    name: string;
    product_id: string;
    slug: string;
  };
  varitants: CartVaritantRequest;
  thumbnail: string;
  original_price: number;
  quantity: number;
};
/**
 * type of cart varitant attribute api response
 */
export type CartVaritantAttribute = {
  name: string;
  value: string;
  thumbnail?: string;
  other: string[];
};
/**
 * type of  cart varitant api response
 */
export type CartVaritant = {
  sku: string;
  attributes: CartVaritantAttribute[];
};
/**
 * type of cart attribute
 *
 */
export type CartInfo = {
  product_id: string;
  name: string;
  slug: string;
};
/**
 * type of cart response
 */
export type Cart = {
  id: string;
  info: CartInfo;
  varitants: CartVaritant;
  thumbnail: string;
  total_price: number;
  quantity: number;
  original_price: number;
};
/**
 * types of update attribute cart vartitant
 */
export interface CartVaritantAttributeUpdateRequest {
  name: string;
  value: string;
}
/**
 * Type of request when update cart
 */
export interface CartUpdateRequest {
  id: string;
  attributes?: CartVaritantAttributeUpdateRequest[];
  quantity?: number;
}
/**
 * Patch cart request type
 */
export interface CartPatchRequest {
  sku: string;
  attributes: { name: string; value: string }[];
}
