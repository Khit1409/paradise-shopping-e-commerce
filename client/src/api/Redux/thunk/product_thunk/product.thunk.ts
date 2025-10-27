import {
  GetProductByCategoryRequest,
  Product,
  ProductPreviewDataType,
  SingelProductDataResponse,
} from "@/api/interfaces/product.interface";
import {
  getHomeProductService,
  getProductShopService,
  getSingleProductService,
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
  ProductPreviewDataType[],
  /**
   * request type
   */
  {
    max_sale?: number | string;
    min_sale?: number | string;
    cate_slug?: string;
    max_price?: number | string;
    min_price?: number | string;
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
  async (
    { cate_slug, area, max_price, max_sale, min_price, min_sale },
    thunkAPI
  ) => {
    try {
      /**
       * service
       */
      const payload = await getProductShopService({
        area,
        cate_slug,
        max_price,
        max_sale,
        min_price,
        min_sale,
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
