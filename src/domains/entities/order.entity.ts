export class OrderEntity {
  public id: string;
  public code: number;
  public user_id: string;
  public store_id: string;
  public created_at: Date;
  public updated_at: Date;
  constructor(props: Partial<OrderEntity>) {
    Object.assign(this, props);
  }
}

export class OrderItemEntity {
  public name: string;
  public status:
    | 'PENDING'
    | 'ACCEPTED'
    | 'SHIPPING'
    | 'RECEIVED'
    | 'SHIPPINGFAILED';
  public shipping_type: 'COD' | 'FLASH';
  public pay_state: 'PAID' | 'UNPAID';
  public pay_type: 'COD' | 'ONLINE';
  public quantity: number;
  public total_price: number;
  public product_id: string;
  public img: string;
  constructor(props: Partial<OrderItemEntity>) {
    Object.assign(this, props);
  }
}

export class OrderContactEntity {
  public user_name: string;
  public address: string;
  public phone: string;
  public email: string;
  constructor(props: Partial<OrderContactEntity>) {
    Object.assign(this, props);
  }
}

export class OrderVaritantEnitity {
  public sku: string;
  public attributes: { name: string; value: string }[];
  constructor(props: Partial<OrderVaritantEnitity>) {
    Object.assign(this, props);
  }
}
export class OrderResponseEntity {
  public id: string;
  public contacts: OrderContactEntity;
  public varitants: OrderVaritantEnitity;
  public items: OrderItemEntity;
  public created_at: Date;
  constructor(props: Partial<OrderResponseEntity>) {
    Object.assign(this, props);
  }
}
