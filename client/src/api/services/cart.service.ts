import axios from "axios";
import {
  AddToCartType,
  UpdateCartType,
  UserCart,
} from "../interfaces/cart.interface";
/**
 * =====================================
 * CART SERVICES
 * =====================================
 */
const CART_API_URL = process.env.NEXT_PUBLIC_CART_API_URL!;
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
    const res = await axios.post(`${CART_API_URL}/add_to_cart`, body, {
      withCredentials: true,
    });
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
    const res = await axios.get(`${CART_API_URL}/get_user_cart`, {
      withCredentials: true,
    });
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
    const res = await axios.delete(
      `${CART_API_URL}/delete_user_cart/${cartId}`,
      {
        withCredentials: true,
      }
    );
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
    const res = await axios.put(
      `${CART_API_URL}/update_user_cart`,
      body,
      {
        withCredentials: true,
      }
    );
    return res.data as { message: string; resultCode: number };
  } catch (error) {
    return handleApiError(error);
  }
}
