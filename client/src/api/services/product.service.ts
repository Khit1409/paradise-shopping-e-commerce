import axios from "axios";
import {
  GetProductByCategoryRequest,
  Categories,
  SingelProductDataResponse,
  ProductShopPage,
  Product,
} from "../interfaces/product.interface";
/**
 * Function get all product in database
 * query _id category , keyword, limit and page
 * @param param0
 */
export async function getHomeProductService({
  page,
}: GetProductByCategoryRequest) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/get_home_product?page=${page}
    `
  );
  const api: Product[] = res.data;
  return api;
}
/**
 * Function get all product in database
 * query _id category , keyword, limit and page
 * @param param0
 */
export async function getProductShopService({
  pro_price,
  cate_slug,
  area,
  pro_sale,
}: {
  pro_sale?: number | string;
  cate_slug?: string;
  pro_price?: number | string;
  area?: string;
}) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/get_product_shop?pro_price=${pro_price}&cate_slug=${cate_slug}&area=${area}&pro_sale=${pro_sale}`
  );
  const api: ProductShopPage[] = res.data;
  return api;
}

/**
 * Get categories service
 */
export async function getCategoriesFilterService() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/get_categories_filter`
  );
  const api: Categories[] = res.data;
  return api;
}
/**
 * Get product single
 * @param2
 */
export async function getSingleProductService({
  id,
  slug,
}: {
  id: string;
  slug?: string;
}) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/get_single_product?${
      id ? `id=${id}` : `slug=${slug}`
    }`
  );
  const api: SingelProductDataResponse = res.data;
  return api;
}
//type add to cart request
export type AddToCartType = {
  proId: string;
  name: string;
  quantity: number;
  price: number;
  img: string;
  choose: {
    attrName: string;
    itemValue: string;
  }[];
};
/**
 * Add to cart service
 * @param param0
 * @returns
 */
export async function addToCartServicer({
  img,
  name,
  price,
  proId,
  quantity,
  choose,
}: AddToCartType) {
  try {
    if (!proId) {
      return { message: "Lỗi tham số nhận vào", resultCode: 0 };
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/carts/add_to_cart`,
      { name, img, proId, price, quantity, choose },
      { withCredentials: true }
    );
    return res.data as { message: string; resultCode: number };
  } catch (error) {
    return { message: `${error}`, resultCode: 0 };
  }
}
/**
 * Get cart by user id
 * @param param0
 * @returns
 */
export interface UserCart {
  _id: string;
  cartImg: string;
  cartName: string;
  cartPrice: number;
  proId: string;
  cartQuantity: number;
  cartTotalPrice: number;
  cartAttributes: CartAttribute[];
}

export interface CartAttribute {
  _id: string;
  attrName: string;
  itemValue: string;
  otherValue: { value: string; _id: string }[];
}

export async function getUserCartService() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/carts/get_user_cart`,
      { withCredentials: true }
    );
    const api: UserCart[] = res.data;
    return api;
  } catch (error) {
    console.error(error);
    return [];
  }
}
/**
 * delete user cart
 * @param cartId
 * @returns
 */
export async function deleteUserCartService(
  cartId: string
): Promise<{ message: string; resultCode: number }> {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/carts/delete_user_cart/${cartId}`,
      { withCredentials: true }
    );
    const result: { resultCode: number; message: string } = res.data;
    return result;
  } catch (error) {
    return { message: `${error}`, resultCode: 0 };
  }
}

/**
 * update user cart
 */
export type UpdateCartType = {
  newQuantity?: number;
  cartId: string;
  newAttributes?: { _id: string; attrName?: string; itemValue?: string }[];
};
export async function updateUserCart({ ...req }: UpdateCartType) {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/carts/update_user_cart`,
      {
        ...req,
      },
      { withCredentials: true }
    );
    const result: { message: string; resultCode: number } = res.data;
    return result;
  } catch (error) {
    return { message: `${error}`, resultCode: 0 };
  }
}
