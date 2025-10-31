import {
  GetProductQueryType,
  SingleProduct,
  Products,
} from "../type/product.interface";
import { apiAction } from "../config/fetch-api.config";

/**
 * ================
 * PRODUCT SERVICES
 * ================
 */

/**
 * Get products api by query
 * @param query
 * @returns
 */
export async function getProducts(
  query: GetProductQueryType
): Promise<Products[]> {
  const { page, area, category, maxPrice, maxSale, minPrice, minSale } = query;
  const params = new URLSearchParams({
    page: String(page ?? 1),
    maxPrice: String(maxPrice ?? ""),
    minPrice: String(minPrice ?? ""),
    category: String(category ?? ""),
    area: String(area ?? ""),
    maxSale: String(maxSale ?? ""),
    minSale: String(minSale ?? ""),
  });
  const res = await apiAction.get(`products?${params.toString()}`);
  const api: Products[] = res.data.api;
  return api;
}
/**
 * Get single product by ID or slug.
 * @param {GetSingleProductRequest} query
 * @returns {Promise<SingleProduct>}
 */
export async function getSingleProduct(id: string): Promise<SingleProduct> {
  const res = await apiAction.get(`products/${id}`);
  const api: SingleProduct = res.data;
  return api;
}
