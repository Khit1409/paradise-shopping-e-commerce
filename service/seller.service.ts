import { apiAction } from "@/config/fetch-api.config";
import { GeneralHandleResponse } from "@/type/general.type";
import { ProductList, SingleProduct } from "@/type/product.interface";
import {
  ProductDataRequest,
  ProductDataUpdateRequest,
} from "@/type/seller.interface";
/**
 *
 * @param param0
 * @returns
 */
export async function getProducts() {
  /**
   * send req
   */
  const res = await apiAction.get(`seller/products`);
  const api: ProductList[] = res.data;
  console.log(api);
  return api;
}
/**
 * get single product func
 * @param param0
 * @returns
 */
export async function getSingleProductSellerService({
  product_id,
}: {
  product_id: string;
}) {
  const res = await apiAction.get(`seller/products/${product_id}`);
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
 */
export async function deleteProduct(id: string) {
  try {
    const res = await apiAction.delete(`seller/products/${id}`);
    const result: { message: string; resultCode: number } = res.data;
    return result;
  } catch (error) {
    return { message: `${error}`, resultCode: 1 };
  }
}
/**
 * update product
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
