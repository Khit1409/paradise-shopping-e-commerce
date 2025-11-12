import {
  AddToCartRequest,
  Cart,
  CartPatchRequest,
} from "@/type/cart.interface";
import { apiAction } from "@/config/fetch-api.config";
import { GeneralHandleResponse } from "@/type/general.type";
/**
 * Add product to cart.
 * @param data
 */
export async function addToCart(
  data: AddToCartRequest
): Promise<GeneralHandleResponse> {
  const res = await apiAction.post(`carts`, { ...data });
  return res.data;
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
export async function deleteCart(id: string): Promise<GeneralHandleResponse> {
  const res = await apiAction.delete(`/carts/${id}`);
  return res.data;
}
/**
 * patch cart part
 * @param quantity
 * @param updateValue
 */
export async function patchCart(req: {
  id: string;
  quantity?: number;
  varitants?: CartPatchRequest;
}): Promise<GeneralHandleResponse> {
  const res = await apiAction.patch(`carts`, {
    id: req.id,
    quantity: req.quantity,
    varitants: req.varitants,
  });
  const result = res.data;
  return result;
}
