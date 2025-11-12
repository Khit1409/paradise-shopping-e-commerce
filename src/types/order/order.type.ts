/**
 * type of varitant attribute of order when finished handle logic
 */
type OrderVaritantAttributeFinishedHandle = {
  name: string;
  value: string;
};
/**
 * type of order varitant when finished handle logic
 */
type OrderVaritantFinishedHandle = {
  sku: string;
  attributes: OrderVaritantAttributeFinishedHandle[];
};
/**
 * type of order item when finished handle logic
 */
type OrderItemFinishedHandle = {
  img: string;
  name: string;
  shipping_type: 'COD' | 'FLASH';
  status: 'PENDING' | 'ACCEPTED' | 'SHIPPING' | 'RECEIVED' | 'SHIPPINGFAILED';
  pay_type: 'COD' | 'ONLINE';
  pay_state: 'UNPAID' | 'PAID';
  quantity: number;
  product_id: string;
  total_price: number;
};
/**
 * type of order contact when finished handle logic
 */
type OrderContactFinishedHandle = {
  address: string;
  phone: string;
  email: string;
  user_name: string;
};
export type OrderStoreInformationFinishedHandle = {
  store_name: string;
};
/**
 * type of order when finished handle logic
 * using for mapping to dto
 */
export type OrderFinishedHandle = {
  id: string;
  store_info: OrderStoreInformationFinishedHandle;
  varitants: OrderVaritantFinishedHandle;
  items: OrderItemFinishedHandle;
  contacts: OrderContactFinishedHandle;
  created_at: Date;
};
/**
 * type of order request
 */
type OrderItemRequest = {
  name: string; //product name
  shipping_type: 'COD' | 'FLASH';
  pay_type: 'COD' | 'ONLINE';
  quantity: number;
  total_price: number;
  product_id: string;
  img: string;
};
/**
 * create new order varitant attribute request
 */
type OrderVaritantAttributeRequest = {
  name: string;
  value: string;
};
/**
 * create new order varitant request
 */
type OrderVaritantRequest = {
  sku: string;
  attributes: OrderVaritantAttributeRequest[];
};
/**
 * create new order contact request
 */
type OrderContactRequest = {
  user_name: string;
  address: string;
  phone: string;
  email: string;
};
/**
 * create new order request
 * final type
 */
export type OrderRequest = {
  items: OrderItemRequest;
  contacts: OrderContactRequest;
  varitants: OrderVaritantRequest;
};
