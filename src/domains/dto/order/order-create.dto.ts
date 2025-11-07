export class CreateOrderItemDto {
  name: string; //product name
  shipping_type: 'COD' | 'FLASH';
  pay_type: 'COD' | 'ONLINE';
  quantity: number;
  total_price: number;
  product_id: string;
  img: string;
}
export class CreateOrderContactDto {
  user_name: string;
  address: string;
  phone: string;
  email: string;
}

export class CreateOrderVaritantAttributeDto {
  name: string;
  value: string;
}
export class CreateOrderVaritantDto {
  sku: string;
  attributes: CreateOrderVaritantAttributeDto[];
}

export class CreateOrderDto {
  item: CreateOrderItemDto;
  contact: CreateOrderContactDto;
  varitant: CreateOrderVaritantDto;
}
