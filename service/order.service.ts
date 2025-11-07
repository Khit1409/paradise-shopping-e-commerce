import { apiAction } from "@/config/fetch-api.config";
import {
  CreatePaymentLinkResponse,
  OrderRequest,
  OrderResponseType,
} from "@/type/order.interface";

/**
 *
 * @param param0
 * @returns
 */
export async function createOrder({ ...req }: OrderRequest): Promise<{
  message: string;
  resultCode: number;
  payment: CreatePaymentLinkResponse | null;
}> {
  try {
    const result = await apiAction.post(`order`, { ...req });
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
 * @description get user order by id in cookie
 * @param param0
 * @returns
 */
export async function getOrder(): Promise<OrderResponseType[]> {
  try {
    const res = await apiAction.get("order");
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
/**
 * cancel checkout action
 * @param paymentLinkId
 * @param cancellationReason
 */
export async function cancelCheckout(
  paymentLinkId: string,
  cancellationReason?: string
) {
  const res = await apiAction.post(`payments/cancel-payment`, {
    paymentLinkId,
    cancellationReason,
  });
  const data: { resultCode: number } = res.data;
  return data;
}
