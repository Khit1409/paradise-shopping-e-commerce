import {
  GetProductByCategoryRequest,
  SingelProductDataResponse,
  Product,
  GetProductShopRequest,
  GetSingleProductRequest,
  ProductPreviewDataType,
} from "../interfaces/product.interface";
import { apiAction } from "@/config/axios";

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
}: GetProductByCategoryRequest): Promise<ProductPreviewDataType[]> {
  const res = await apiAction.get(`products/get_home_product?page=${page}`);
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
): Promise<ProductPreviewDataType[]> {
  const params = new URLSearchParams({
    maxPrice: String(query.max_price ?? ""),
    minPrice: String(query.min_price ?? ""),
    category: String(query.cate_slug ?? ""),
    area: String(query.area ?? ""),
    maxSale: String(query.max_sale ?? ""),
    minSale: String(query.min_sale ?? ""),
  });

  const res = await apiAction.get(
    `products/get_product_shop?${params.toString()}`
  );

  const api: ProductPreviewDataType[] = res.data.api;
  return api;
}
/**
 * Get single product by ID or slug.
 * @param {GetSingleProductRequest} query
 * @returns {Promise<SingelProductDataResponse>}
 */
export async function getSingleProductService(
  query: GetSingleProductRequest
): Promise<SingelProductDataResponse> {
  const param = query.id ? `id=${query.id}` : `slug=${query.slug}`;
  const res = await apiAction.get(`products/get_single_product?${param}`);
  const api: SingelProductDataResponse = res.data.api;
  return api;
}
