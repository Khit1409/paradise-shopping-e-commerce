import { apiAction } from "@/config/axios";
/**
 * Function get products & category by seller_id for
 * manager product of seller page
 */

export interface ProductSeller {
  _id: string;
  proName: string;
  proPrice: number;
  proImg: string;
  proSlug: string;
}
/**
 *
 * @param param0
 * @returns
 */
export async function getProductSellerService({
  cate_slug,
}: {
  cate_slug?: string;
}) {
  /**
   * send req
   */
  const res = await apiAction.get(
    `seller/get_product_seller?cate_slug=${cate_slug}`
  );
  const api: ProductSeller[] = res.data;
  return api;
}
/**
 * Get single product for updata for seller type
 */
export interface SingleProductSeller {
  _id: string;
  proName: string;
  proTag: string;
  proSlug: string;
  proCateSlug: string;
  proPrice: number;
  proSale: number;
  proImg: string;
  proDescription: string;
  proImgDetails: {
    _id: string;
    imgUrl: string;
  }[];
  proAttributes: {
    _id: string;
    attrName: string;
    items: {
      _id: string;
      itemValue: string;
      itemImg: string;
    }[];
  }[];
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
  const res = await apiAction.get(
    `seller/get_single_product_seller?product_id=${product_id}`
  );
  const api: SingleProductSeller = res.data;
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
  hashtag: string;
  description: string;
  img?: string;
  imgDetail?: { imgUrl?: string }[];
  attribute?: {
    name: string;
    item: {
      value: string;
      img?: string;
    }[];
  }[];
}
/**
 *
 * @param param0
 * @returns
 */
export async function upNewProductService({
  cate_slug,
  description,
  hashtag,
  name,
  price,
  sale,
  attribute,
  img,
  imgDetail,
}: UpProductReq) {
  const res = await apiAction.post(`seller/up_new_product`, {
    cate_slug,
    description,
    hashtag,
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
 * service update product
 */
export async function sellerUpdateProductService({
  attribute,
  product_id,
  imgDetail,
  proCateSlug,
  proDescription,
  proImg,
  proName,
  proPrice,
  proSale,
}: SellerUpdateProductRequest) {
  const res = await apiAction.post(`seller/update_product_single`, {
    attribute,
    product_id,
    imgDetail,
    proCateSlug,
    proDescription,
    proImg,
    proName,
    proPrice,
    proSale,
  });
  const api: { resultCode: number; message: string } = res.data;
  return api;
}
/**
 * Delete something (img detail , attribute, attribute item) in single products
 */
export type DeleteReq = {
  proId: string;
  imgDetail?: { _id: string }[];
  attribute?: { _id: string }[];
  attributeItem?: { attrId: string; _id: string }[];
};
export async function deleteActionSingleProductService({
  attribute,
  attributeItem,
  imgDetail,
  proId,
}: DeleteReq) {
  const res = await apiAction.post(`seller/delete_action_single_product`, {
    attribute,
    proId,
    imgDetail,
    attributeItem,
  });
  const api: { message: string; resultCode: number } = res.data;
  return api;
}
/**
 * delete one product by id
 */
export async function deleteSingleProduct(id: string) {
  try {
    const res = await apiAction.delete(`seller/delete_single_product/${id}`);
    const result: { message: string; resultCode: number } = res.data;
    return result;
  } catch (error) {
    return { message: `${error}`, resultCode: 1 };
  }
}
