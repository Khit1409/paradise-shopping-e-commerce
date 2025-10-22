import {
  AddToCartType,
  GetProductByCategoryRequest,
  Product,
  ProductShopPage,
  SingelProductDataResponse,
  UserCart,
} from "@/api/interfaces/product.interface";
import {
  addToCartServicer,
  getHomeProductService,
  getProductShopService,
  getSingleProductService,
  getUserCartService,
} from "@/api/services/product.service";
import {
  getProductSellerService,
  ProductSeller,
} from "@/api/services/seller.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Get product api for home page and shop page
 * query _id category , keyword, limit and page
 */
export const getHomeProductThunk = createAsyncThunk<
  /**
   * Response type
   */
  Product[],
  /**
   * request type
   */
  GetProductByCategoryRequest,
  /**
   * rejected type
   */
  { rejectValue: string }
>(
  "get all product",
  /**
   * thunk handle
   * @param param0
   * @param thunkAPI
   * @returns
   */
  async ({ page }, thunkAPI) => {
    try {
      /**
       * use service
       */
      const data = await getHomeProductService({
        page,
      });
      const payload = data;
      return payload;
    } catch (error) {
      /**
       * return reject value
       */
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
/**
 * Get single product
 */
export const getSingleProductThunk = createAsyncThunk<
  /**
   * response type
   */
  SingelProductDataResponse,
  /**
   * request type
   */
  { id: string; slug?: string },
  /**
   * reject response
   */
  { rejectValue: string }
>(
  "product single",
  /**
   * thunk handle
   * @param param0
   * @param thunkAPI
   * @returns
   */
  async ({ id, slug }, thunkAPI) => {
    try {
      /**
       * use service
       */
      const payload = await getSingleProductService({ id, slug });
      return payload;
    } catch (error) {
      /**
       * return reject value
       */
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
/**
 * get product shop page
 */
export const getProductShopThunk = createAsyncThunk<
  /**
   * response type
   */
  ProductShopPage[],
  /**
   * request type
   */
  {
    pro_sale?: number | string;
    cate_slug?: string;
    pro_price?: number | string;
    area?: string;
  },
  /**
   * thunk error response type
   */
  { rejectValue: string }
>(
  "product shop",
  /**
   * thunk handle
   * @param param0
   * @param thunkAPI
   * @returns
   */
  async ({ cate_slug, area, pro_price, pro_sale }, thunkAPI) => {
    try {
      /**
       * service
       */
      const payload = await getProductShopService({
        area,
        cate_slug,
        pro_sale,
        pro_price,
      });
      return payload;
    } catch (error) {
      /**
       * return reject value
       */
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
/**
 * Get product for seller manager product
 */
export const getProductSellerThunk = createAsyncThunk<
  /**
   * res
   */
  ProductSeller[],
  /***
   * req
   */
  { cate_slug?: string },
  /**
   * error
   */
  { rejectValue: string }
>(
  "get product seller",
  /**
   * handle func
   * @param param0
   * @param thunkAPI
   * @returns
   */
  async ({ cate_slug }, thunkAPI) => {
    try {
      /**
       * service
       */
      const payload = await getProductSellerService({
        cate_slug,
      });

      return payload;
    } catch (error) {
      /**
       * return err
       */
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
/***
 * Add to cart thunk
 */
export const addToCartThunk = createAsyncThunk<
  // response
  { message: string; resultCode: number },
  //request
  AddToCartType,
  //error
  { rejectValue: string }
>(
  "add to cart",
  //handle
  async ({ img, name, price, proId, quantity, choose }, thunkAPI) => {
    try {
      const result = await addToCartServicer({
        img,
        name,
        price,
        proId,
        quantity,
        choose,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
/**
 * get user cart thunk
 */
export const getUserCartThunk = createAsyncThunk<
  UserCart[],
  void,
  { rejectValue: string }
>(
  //name
  "get user cart",
  //handle
  async (_, thunkAPI) => {
    try {
      const result = await getUserCartService();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
