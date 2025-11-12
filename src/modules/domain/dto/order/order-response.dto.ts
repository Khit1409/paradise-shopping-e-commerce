/**
 * dto of order item response
 */
export class OrderItemResponseDto {
  img: string;
  name: string;
  shipping_type: 'COD' | 'FLASH';
  status: 'PENDING' | 'ACCEPTED' | 'SHIPPING' | 'RECEIVED' | 'SHIPPINGFAILED';
  pay_type: 'COD' | 'ONLINE';
  pay_state: 'UNPAID' | 'PAID';
  quantity: number;
  total_price: number;
  product_id: string;
  constructor(partial: Partial<OrderItemResponseDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of order contact response
 */
export class OrderContactResponseDto {
  address: string;
  email: string;
  phone: string;
  user_name: string;
  constructor(partial: Partial<OrderContactResponseDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of order varitant attribute response
 */
export class OrderVaritantAttributeResponseDto {
  name: string;
  value: string;
  constructor(partial: Partial<OrderVaritantAttributeResponseDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of order varitant response
 */
export class OrderVaritantResponseDto {
  sku: string;
  attributes: OrderVaritantAttributeResponseDto[];
  constructor(partial: Partial<OrderVaritantResponseDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of order store information response
 */
export class OrderStoreInformationResponseDto {
  store_name: string;
}
/**
 * dto of order response
 */
export class OrderResponseDto {
  id: string;
  store_info: OrderStoreInformationResponseDto;
  items: OrderItemResponseDto;
  varitants: OrderVaritantResponseDto;
  contacts: OrderContactResponseDto;
  created_at: Date;
  constructor(partial: Partial<OrderResponseDto>) {
    Object.assign(this, partial);
  }
}
