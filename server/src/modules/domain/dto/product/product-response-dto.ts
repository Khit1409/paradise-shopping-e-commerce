import { OmitType } from '@nestjs/mapped-types';
/**
 * product infomation dto
 */
export class ProductInformationResponseDto {
  name: string;
  slug: string;
  brand: string;
  category: string;
  constructor(partial: Partial<ProductInformationResponseDto>) {
    Object.assign(this, partial);
  }
}
/**
 * product owner information api response dto
 */
export class ProductOwnerInformationResponseDto {
  seller_id: string;
  store_id: string;
  constructor(partial: Partial<ProductOwnerInformationResponseDto>) {
    Object.assign(this, partial);
  }
}
/**
 * product varitant attribute api response dto
 */
export class ProductVaritantAttributeResponseDto {
  name: string;
  value: string[];
  constructor(partial: Partial<ProductVaritantAttributeResponseDto>) {
    Object.assign(this, partial);
  }
}
/**
 * product varitant api response dto
 */
export class ProductVaritantResponseDto {
  sku: string;
  stoke: number;
  attributes: ProductVaritantAttributeResponseDto[];
  constructor(partial: Partial<ProductVaritantResponseDto>) {
    Object.assign(this, partial);
  }
}
/**
 * type full of product single
 */
export class SingleProductResponseDto {
  id: string;
  owner_info: ProductOwnerInformationResponseDto;
  info: ProductInformationResponseDto;
  varitants: ProductVaritantResponseDto[];
  original_price: number;
  sale: number;
  rating: number;
  sold: string;
  thumbnail: string;
  images: string[];
  isActive: boolean;
  tags: string[];
  constructor(partial: Partial<SingleProductResponseDto>) {
    Object.assign(this, partial);
  }
}
/**
 * product list api response dto
 */
export class GetProductByQueryResponseDto extends OmitType(
  SingleProductResponseDto,
  ['owner_info', 'varitants', 'images', 'tags'] as const,
) {
  constructor(partial: Partial<GetProductByQueryResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
/**
 * product single api response dto
 */
export class GetSingleProductResponseDto extends OmitType(
  SingleProductResponseDto,
  ['owner_info'] as const,
) {
  constructor(partial: Partial<GetSingleProductResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
