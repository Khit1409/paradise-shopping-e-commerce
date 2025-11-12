/**
 * cart infomation response dto
 */
export class CartInformationResponseDto {
  slug: string;
  name: string;
  product_id: string;
  constructor(partial: Partial<CartInformationResponseDto>) {
    Object.assign(this, partial);
  }
}
/**
 * cart varitant attribute response dto
 */
export class CartVaritantAttributeResponseDto {
  name: string;
  value: string;
  other: string[];
  constructor(partial: Partial<CartVaritantAttributeResponseDto>) {
    Object.assign(this, partial);
  }
}
/**
 * cart varitant response dto
 */
export class CartVaritantResponseDto {
  sku: string;
  attributes: CartVaritantAttributeResponseDto[];
  constructor(partial: Partial<CartVaritantResponseDto>) {
    Object.assign(this, partial);
  }
}
/**
 * cart response dto
 */
export class CartResponseDto {
  id: string;
  info: CartInformationResponseDto;
  varitants: CartVaritantResponseDto;
  total_price: number;
  original_price: number;
  thumbnail: string;
  quantity: number;
  constructor(partial: Partial<CartResponseDto>) {
    Object.assign(this, partial);
  }
}
