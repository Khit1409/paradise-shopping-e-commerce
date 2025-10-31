import { apiAction } from "../config/fetch-api.config";
import { Products, SingleProduct } from "../type/product.interface";
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
  const api: Products[] = res.data;
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
 * Up new product
 */
export interface UpProductReq {
  name: string;
  cate_slug: string;
  price: number;
  sale: number;
  description: string;
  img: string;
  imgDetail: { imgUrl: string }[];
  attribute: {
    attrName: string;
    items: {
      itemValue: string;
      itemImg?: string;
    }[];
  }[];
}
/**
 *
 * @param param0
 * @returns
 */
export async function createNewProduct({
  cate_slug,
  description,
  name,
  price,
  sale,
  attribute,
  img,
  imgDetail,
}: UpProductReq) {
  const res = await apiAction.post(`seller/products`, {
    cate_slug,
    description,
    name,
    price,
    sale,
    attribute,
    img,
    imgDetail,
  });
  const api: { message: string; resultCode: number } = res.data;
  return api;
}
/**
 * Create new store
 */
export type CreateNewStoreRequest = {
  store_name: string;
  store_email: string;
  store_phone: string;
  store_password: string;
  store_address: string;
  store_area: string;
  store_area_slug: string;
  owner_id: string;
};
/**
 *
 * @param param0
 * @returns
 */
export async function createNewStoreService({
  owner_id,
  store_address,
  store_area,
  store_area_slug,
  store_email,
  store_name,
  store_password,
  store_phone,
}: CreateNewStoreRequest) {
  try {
    const res = await apiAction.post(`users/create_store`, {
      store_address,
      owner_id,
      store_email,
      store_area,
      store_name,
      store_area_slug,
      store_password,
      store_phone,
    });
    const api: { message: string; resultCode: number } = res.data;
    return api;
  } catch (error) {
    return { message: `${error}`, resultCode: 0 };
  }
}

/**
 * seller update product request type
 */
export type SellerUpdateProductRequest = {
  product_id: string;
  proName?: string;
  proPrice?: number;
  proDescription?: string;
  proCateSlug?: string;
  proSale?: number;
  proImg?: string;
  imgDetail?: {
    _id?: string;
    imgUrl?: string;
  }[];
  attribute: {
    _id?: string;
    attrName: string;
    items?: {
      _id?: string;
      itemValue: string;
      itemImg?: string;
    }[];
  }[];
};
/**
 * Delete something (img detail , attribute, attribute item) in single products
 */
export type DeleteReq = {
  imgDetail?: { _id: string }[];
  attribute?: { _id: string }[];
  attributeItem?: { attrId: string; _id: string }[];
};
type UpdateType = {
  updateValue: SellerUpdateProductRequest;
  deleteValue: DeleteReq;
};
/**
 * service update product
 */
export async function updateProduct({
  id,
  body,
}: {
  id: string;
  body: UpdateType;
}) {
  const res = await apiAction.put(`seller/products/${id}`, {
    ...body,
  });
  const api: { resultCode: number; message: string } = res.data;
  return api;
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
