import axios from "axios";
import {
  GetProductByCategoryRequest,
  SingelProductDataResponse,
  ProductShopPage,
  Product,
  GetProductShopRequest,
  GetSingleProductRequest,
} from "../interfaces/product.interface";

/**
 * =====================================
 * API CONFIGURATION
 * =====================================
 */

const PRODUCT_API_URL = process.env.NEXT_PUBLIC_PRODUCT_API_URL!;

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
    `${PRODUCT_API_URL}/get_home_product?page=${page}`,
    { withCredentials: true }
  );
  const api: Product[] = res.data.api;
  return api;
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
    `${PRODUCT_API_URL}/get_product_shop?${params.toString()}`,
    { withCredentials: true }
  );

  const api: ProductShopPage[] = res.data.api;
  return api;
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
  const res = await axios.get(
    `${PRODUCT_API_URL}/get_single_product?${param}`,
    { withCredentials: true }
  );
  const api: SingelProductDataResponse = res.data.api;
  return api;
}
