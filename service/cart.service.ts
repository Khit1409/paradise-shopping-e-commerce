import axios from "axios";
import {
  AddToCartRequest,
  Cart,
  CartPatchRequest,
} from "@/type/cart.interface";
import { apiAction } from "@/config/fetch-api.config";
/**
 * =============
 * CART SERVICES
 * =============
 */
/**
 * Helper: Standardized error response
 */
const handleApiError = (
  error: unknown
): { message: string; resultCode: number } => {
  const msg =
    axios.isAxiosError(error) && error.response?.data?.message
      ? error.response.data.message
      : String(error);
  return { message: msg, resultCode: 0 };
};
/**
 * Add product to cart.
 * @param data
 */
export async function addToCart(
  data: AddToCartRequest
): Promise<{ message: string; resultCode: number }> {
  try {
    if (!data.info.product_id) {
      return { message: "Thiếu mã sản phẩm!", resultCode: 0 };
    }
    const res = await apiAction.post(`carts`, { ...data });
    return res.data as { message: string; resultCode: number };
  } catch (error) {
    return handleApiError(error);
  }
}
/**
 * get user cart
 *
 */
export async function getCart(): Promise<Cart[]> {
  try {
    const res = await apiAction.get("/carts");
    const api: Cart[] = res.data;
    return api;
  } catch (error) {
    console.log(error);
    return [];
  }
}
/**
 * delete by id
 * @param id
 */
export async function deleteCart(id: string) {
  try {
    const res = await apiAction.delete(`/carts/${id}`);
    if (!res.data || res.data.resultCode !== 1) {
      return "failed";
    }
    return "ok";
  } catch (error) {
    console.log(error);
    return "failed";
  }
}
/**
 * patch cart part
 * @param quantity
 * @param updateValue
 */
export async function patchCart(req: {
  id: string;
  quantity?: number;
  updateValue: CartPatchRequest;
}) {
  try {
    const res = await apiAction.patch(`carts`, {
      id: req.id,
      quantity: req.quantity,
      ...req.updateValue,
    });
    const result: { message: string; resultCode: number } = res.data;
    return result;
  } catch (error) {
    return { message: `${error}`, resultCode: 0 };
  }
}
