/**
 * create new order item dto
 */
export class CreateOrderItemDto {
  name: string; //product name
  shipping_type: 'COD' | 'FLASH';
  pay_type: 'COD' | 'ONLINE';
  quantity: number;
  total_price: number;
  product_id: string;
  img: string;
  constructor(partial: Partial<CreateOrderItemDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of create order contact
 */
export class CreateOrderContactDto {
  user_name: string;
  address: string;
  phone: string;
  email: string;
  constructor(partial: Partial<CreateOrderContactDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of create order varitant attribute
 */
export class CreateOrderVaritantAttributeDto {
  name: string;
  value: string;
  constructor(partial: Partial<CreateOrderVaritantAttributeDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of create order varitant
 */
export class CreateOrderVaritantDto {
  sku: string;
  attributes: CreateOrderVaritantAttributeDto[];
  constructor(partial: Partial<CreateOrderVaritantDto>) {
    Object.assign(this, partial);
  }
}
/**
 * dto of create order
 */
export class CreateOrderDto {
  items: CreateOrderItemDto;
  contacts: CreateOrderContactDto;
  varitants: CreateOrderVaritantDto;
  constructor(partial: Partial<CreateOrderDto>) {
    Object.assign(this, partial);
  }
}
