export type OrderKindOfShipping = "FLASH" | "COD";
export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "SHIPPING"
  | "RECEIVED"
  | "SHIPPINGFAILED";

export type OrderKindOfPay = "COD" | "ONLINE";
export type OrderPayStatus = "PAID" | "UNPAID";
/**
 * Order item type
 */
export type OrderItem = {
  name: string;
  shipping_type: OrderKindOfShipping;
  pay_type: OrderKindOfPay;
  quantity: number;
  total_price: number;
  product_id: string;
  img: string;
};
/**
 * order contact
 */
export type OrderContact = {
  user_name: string;
  address: string;
  phone: string;
  email: string;
};
/**
 * attribute
 */
export type OrderAttributeRequest = {
  name: string;
  value: string;
};
export type OrderVaritantRequest = {
  sku: string;
  attributes: OrderAttributeRequest[];
};
/**
 * User order product service
 */
export type OrderRequest = {
  item: OrderItem;
  contact: OrderContact;
  varitant: OrderVaritantRequest;
};

/**
 * Add new Order
 * @param param0
 * @returns
 */
export type CreatePaymentLinkResponse = {
  bin: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  description: string;
  orderCode: number;
  currency: string;
  paymentLinkId: string;
  status:
    | "PENDING"
    | "CANCELLED"
    | "UNDERPAID"
    | "PAID"
    | "EXPIRED"
    | "PROCESSING"
    | "FAILED";
  expiredAt?: number;
  checkoutUrl: string;
  qrCode: string;
};
/**
 * order response type
 */
export type OrderItemResponse = {
  img: string;
  name: string;
  shipping_type: string;
  status: string;
  pay_type: string;
  pay_state: string;
  quantity: number;
  total_price: number;
  product_id: string; // mongoose object id
};
export type OrderVaritantResponse = {
  sku: string;
  attributes: { name: string; value: string | number }[];
};
export type OrderContactResponse = {
  address: string;
  email: string;
  phone: string;
  user_name: string;
};
export type OrderResponseType = {
  id: string;
  items: OrderItemResponse;
  varitants: OrderVaritantResponse;
  contact: OrderContactResponse;
  created_at: Date;
};
/**
 * order of slice state
 */
export type OrderSliceState = {
  quantity: number;
  total_price: number;
  product_id: string;
  img: string;
  name: string;
  varitant: { sku: string; attributes: OrderAttributeRequest[] };
};
