/**
 *
 */
interface ProductInfoRequest {
  name: string;
  slug: string;
  category: string;
  description: string;
  brand?: string;
}

interface VariantAttributeRequest {
  name: string;
  value: string[];
  image?: string;
}

interface VariantRequest {
  sku: string;
  stoke: number;
  attributes: VariantAttributeRequest[];
}

export interface ProductDataRequest {
  info: ProductInfoRequest;
  original_price: number;
  sale: number;
  thumbnail: string;
  images: string[];
  varitants: VariantRequest[];
}
/**
 * product info update request
 */
interface ProductInfoUpdateRequest {
  name: string;
  slug: string;
  category: string;
  description: string;
  brand?: string;
}
/**
 * product varitant update request
 */
interface VariantAttributeUpdateRequest {
  name: string;
  value: string[];
  image?: string;
}
/**
 * product varitant update request
 */
interface VariantUpdateRequest {
  sku: string;
  stoke: number;
  attributes: VariantAttributeUpdateRequest[];
}
/**
 * final interface product update request
 */
export interface ProductDataUpdateRequest {
  info: ProductInfoUpdateRequest;
  original_price: number;
  sale: number;
  thumbnail: string;
  images: string[];
  varitants: VariantUpdateRequest[];
}
interface EditProductAttributeResponse {
  name: string;
  value: string[];
}
/**
 * interface of edit product response
 */
export interface EditProductApiResponse {
  id: string;
  category: string;
  brands: string[];
  attributes: EditProductAttributeResponse[];
}
/**
 * interface of get order for seller query
 */
export interface GetOrderForSellerQuery {
  sort?: string;
  ship_type?: string;
  pay_type?: string;
  pay_state?: string;
  status?: string;
}
