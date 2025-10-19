import axios from "axios";

/**
 * User order product service
 */
export type OrderRequest = {
  item: OrderItem;
  contact: OrderContact;
};
type OrderItem = {
  proId: string;
  orderName: string;
  orderStatus:
    | "PENDING"
    | "ACCEPTED"
    | "SHIPPING"
    | "RECEIVED"
    | "SHIPPINGFAILED";
  totalPrice: number;
  kindOfShip: "FLASH" | "COD";
  kindOfPay: "COD" | "ONLINE";
  quantity: number;
  payStatus: "PAID" | "UNPAID";
};
type OrderContact = {
  userName: string;
  address: string;
  phone: string;
  email: string;
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
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/new_order`,
      { ...req },
      { withCredentials: true }
    );
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
