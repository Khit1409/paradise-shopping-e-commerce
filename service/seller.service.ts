import { apiAction } from "@/config/fetch-api.config";
import { GeneralHandleResponse } from "@/type/general.type";
import { ProductList, SingleProduct } from "@/type/product.interface";
import {
  ProductDataRequest,
  ProductDataUpdateRequest,
} from "@/type/seller.interface";
/**
 * Get product list by this seller
 * @param param0
 * @returns
 */
export async function getProducts() {
  const res = await apiAction.get(`seller/products`);
  const api: ProductList[] = res.data;
  console.log(api);
  return api;
}
/**
 * get single product func
 * @param id
 * @returns
 */
export async function getSingleProductSellerService(id: string) {
  const res = await apiAction.get(`seller/products/${id}`);
  const api: SingleProduct = res.data;
  return api;
}
/**
 *
 * @param param0
 * @returns
 */
export async function createNewProduct(
  data: ProductDataRequest
): Promise<GeneralHandleResponse> {
  try {
    const res = await apiAction.post("seller/products", data);
    const result: GeneralHandleResponse = res.data;
    return result;
  } catch (error) {
    return { error: `${error}`, message: `${error}`, success: false };
  }
}
/**
 * delete one product by id
 * @param id
 * @returns
 */
export async function deleteProduct(
  id: string
): Promise<GeneralHandleResponse> {
  try {
    const res = await apiAction.delete(`seller/products/${id}`);
    const result: GeneralHandleResponse = res.data;
    return result;
  } catch (error) {
    return { message: `${error}`, success: false, error: error as string };
  }
}
/**
 * update product
 * @param data
 * @returns
 */
export async function updateProduct(
  data: ProductDataUpdateRequest
): Promise<GeneralHandleResponse> {
  try {
    const res = await apiAction.put("seller/products", data);
    const result: GeneralHandleResponse = res.data;
    return result;
  } catch (error) {
    return {
      error: `${error}`,
      message: "Lỗi update sản phẩm",
      success: false,
    };
  }
}
/**
 * stop product active if seller isn't want to stop sell this product
 * @param id
 * @returns
 */
export async function stopProductActive(
  id: string,
  acive: boolean
): Promise<GeneralHandleResponse> {
  try {
    const res = await apiAction.patch(`seller/products/${id}/${acive}`);
    const result: GeneralHandleResponse = res.data;
    return result;
  } catch (error) {
    return { message: `${error}`, error: error as string, success: false };
  }
}
