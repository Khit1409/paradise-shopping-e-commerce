import { apiAction } from "@/config/axios";

export type OrderKindOfShipping = "FLASH" | "COD";
export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "SHIPPING"
  | "RECEIVED"
  | "SHIPPINGFAILED";

export type OrderKindOfPay = "COD" | "ONLINE";
export type OrderPayStatus = "PAID" | "UNPAID";

type OrderItem = {
  proId: string;
  orderName: string;
  orderImg: string;
  orderStatus: OrderStatus;
  totalPrice: number;
  kindOfShip: OrderKindOfShipping;
  kindOfPay: OrderKindOfPay;
  quantity: number;
  payStatus: OrderPayStatus;
};

type OrderContact = {
  userName: string;
  address: string;
  phone: string;
  email: string;
};

type OrderAttributeRequest = {
  attributeName: string;
  attributeValue: string;
};

/**
 * User order product service
 */
export type OrderRequest = {
  item: OrderItem;
  contact: OrderContact;
  attribute: OrderAttributeRequest[];
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
 *
 * @param param0
 * @returns
 */
export async function addNewOrder({ ...req }: OrderRequest): Promise<{
  message: string;
  resultCode: number;
  payment: CreatePaymentLinkResponse | null;
}> {
  try {
    const result = await apiAction.post(`orders`, { ...req });
    const api: {
      message: string;
      resultCode: number;
      payment: CreatePaymentLinkResponse | null;
    } = result.data;
    return api;
  } catch (error) {
    console.error(error);
    return { message: `${error}`, resultCode: 0, payment: null };
  }
}
/**
 * type of user order api
 */
export type UserOrderAPIDataType = {
  orderId: string;
  orderCode: number | string;
  ofUserId: string;
  orderItems: OrderItemAPIDataType;
  orderContacts: OrderContactAPIDataType;
  orderAttribute: OrderAttribute[];
  createdAt: Date;
  updatedAt: Date;
};
export type OrderAttribute = {
  attributeName: string;
  attributeValue: string;
};
export type OrderItemAPIDataType = {
  id: string;
  proId: string;
  ofOrderId: string;
  shipperId: string | null;
  orderName: string;
  orderImg: string;
  orderStatus: OrderStatus;
  orderKindOfShipping: OrderKindOfShipping;
  orderQuantity: number;
  orderPayStatus: "PAID" | "UNPAID";
  orderTotalPrice: number;
  orderKindOfPay: OrderKindOfPay;
};
export type OrderContactAPIDataType = {
  id: number;
  userOrder: string;
  ofOrderId: string;
  orderAddress: string;
  orderPhone: string;
  orderEmail: string;
};
/**
 * @description get user order by id in cookie
 * @param param0
 * @returns
 */
export async function getUserOrders(): Promise<UserOrderAPIDataType[]> {
  try {
    const res = await apiAction.get("orders");
    const data: UserOrderAPIDataType[] = res.data;
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
