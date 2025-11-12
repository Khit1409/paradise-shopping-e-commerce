import { apiAction } from "@/config/fetch-api.config";
import { GeneralHandleResponse } from "@/type/general.type";
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
export async function createOrder({
  ...req
}: OrderRequest): Promise<
  GeneralHandleResponse & { payment: CreatePaymentLinkResponse | null }
> {
  const result = await apiAction.post(`order`, { ...req });
  const api = result.data;
  return api;
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
): Promise<GeneralHandleResponse> {
  const res = await apiAction.post(`payments/cancel-payment`, {
    paymentLinkId,
    cancellationReason,
  });
  const result = res.data;
  return result;
}
