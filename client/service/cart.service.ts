import axios from "axios";
import {
  AddToCartType,
  UpdateCartType,
  UserCart,
} from "../type/cart.interface";
import { apiAction } from "../config/fetch-api.config";
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
 *
 * @param {AddToCartType} body
 * @returns {Promise<{ message: string; resultCode: number }>}
 */
export async function addToCartServicer(
  body: AddToCartType
): Promise<{ message: string; resultCode: number }> {
  try {
    if (!body.proId) {
      return { message: "Thiếu tham số 'proId'", resultCode: 0 };
    }
    const res = await apiAction.post(`carts`, body);
    return res.data as { message: string; resultCode: number };
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Get user's cart.
 *
 * @returns {Promise<UserCart[]>}
 */
export async function getUserCartService(): Promise<UserCart[]> {
  try {
    const res = await apiAction.get(`carts`);
    return res.data as UserCart[];
  } catch (error) {
    console.error("getUserCartService error:", error);
    return [];
  }
}

/**
 * Delete cart item by ID.
 *
 * @param {string} cartId - Cart item ID.
 * @returns {Promise<{ message: string; resultCode: number }>}
 */
export async function deleteUserCartService(
  cartId: string
): Promise<{ message: string; resultCode: number }> {
  try {
    const res = await apiAction.delete(`carts/${cartId}`);
    return res.data as { message: string; resultCode: number };
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Update user's cart item.
 *
 * @param {UpdateCartType} body - Updated cart data.
 * @returns {Promise<{ message: string; resultCode: number }>}
 */
export async function updateUserCart(
  body: UpdateCartType
): Promise<{ message: string; resultCode: number }> {
  try {
    const res = await apiAction.put(`carts`, body);
    return res.data as { message: string; resultCode: number };
  } catch (error) {
    return handleApiError(error);
  }
}
