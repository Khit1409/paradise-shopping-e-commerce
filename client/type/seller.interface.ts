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
