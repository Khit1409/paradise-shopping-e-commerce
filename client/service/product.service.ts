import {
  GetProductQueryType,
  SingleProduct,
  ProductList,
} from "@/type/product.interface";
import { apiAction } from "@/config/fetch-api.config";

/**
 * Get products api by query
 * @param query
 * @returns
 */
export async function getProducts(
  query: GetProductQueryType
): Promise<ProductList[]> {
  const {
    page,
    brand,
    category,
    location,
    max_price,
    max_sale,
    min_price,
    min_sale,
  } = query;
  const params = new URLSearchParams({
    page: String(page ?? 1),
    max_price: String(max_price ?? ""),
    min_price: String(min_price ?? ""),
    category: String(category ?? ""),
    location: String(location ?? ""),
    max_sale: String(max_sale ?? ""),
    min_sale: String(min_sale ?? ""),
    brand: String(brand ?? ""),
  });
  const res = await apiAction.get(`products?${params.toString()}`);
  const api: ProductList[] = res.data;
  return api;
}
/**
 * Get single product by ID or slug.
 * @param id
 */
export async function getSingleProduct(id: string): Promise<SingleProduct> {
  const res = await apiAction.get(`products/${id}`);
  const api: SingleProduct = res.data;
  return api;
}
/** */