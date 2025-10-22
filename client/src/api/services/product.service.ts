import axios from "axios";
import {
  GetProductByCategoryRequest,
  SingelProductDataResponse,
  ProductShopPage,
  Product,
  GetProductShopRequest,
  AddToCartType,
  UserCart,
  GetSingleProductRequest,
  UpdateCartType,
} from "../interfaces/product.interface";

/**
 * =====================================
 * API CONFIGURATION
 * =====================================
 */

const PRODUCT_API_URL = process.env.NEXT_PUBLIC_PRODUCT_API_URL!;

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
 * ================
 * PRODUCT SERVICES
 * ================
 */

/**
 * Get all products for home page.
 *
 * @param {GetProductByCategoryRequest} param0
 * @returns {Promise<Product[]>}
 */
export async function getHomeProductService({
  page,
}: GetProductByCategoryRequest): Promise<Product[]> {
  const res = await axios.get(
    `${PRODUCT_API_URL}/get_home_product?page=${page}`
  );
  return res.data as Product[];
}

/**
 * Get all products for shop page with filters.
 *
 * @param {GetProductShopRequest} query - Filtering query.
 * @returns {Promise<ProductShopPage[]>}
 */
export async function getProductShopService(
  query: GetProductShopRequest
): Promise<ProductShopPage[]> {
  const params = new URLSearchParams({
    pro_price: String(query.pro_price ?? ""),
    cate_slug: String(query.cate_slug ?? ""),
    area: String(query.area ?? ""),
    pro_sale: String(query.pro_sale ?? ""),
  });

  const res = await axios.get(
    `${PRODUCT_API_URL}/get_product_shop?${params.toString()}`
  );
  return res.data as ProductShopPage[];
}

/**
 * Get single product by ID or slug.
 *
 * @param {GetSingleProductRequest} query
 * @returns {Promise<SingelProductDataResponse>}
 */
export async function getSingleProductService(
  query: GetSingleProductRequest
): Promise<SingelProductDataResponse> {
  const param = query.id ? `id=${query.id}` : `slug=${query.slug}`;
  const res = await axios.get(`${PRODUCT_API_URL}/get_single_product?${param}`);
  return res.data as SingelProductDataResponse;
}

/**
 * =====================================
 * CART SERVICES
 * =====================================
 */

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
    const res = await axios.post(`${PRODUCT_API_URL}/carts/add_to_cart`, body, {
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
    const res = await axios.get(`${PRODUCT_API_URL}/carts/get_user_cart`, {
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
      `${PRODUCT_API_URL}/carts/delete_user_cart/${cartId}`,
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
      `${PRODUCT_API_URL}/carts/update_user_cart`,
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
