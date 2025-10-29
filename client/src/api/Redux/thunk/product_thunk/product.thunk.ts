import {
  Products,
  SingleProduct,
  GetProductQueryType,
} from "@/api/interfaces/product.interface";
import { getProducts, getSingleProduct } from "@/api/services/product.service";
import {
  getProductSellerService,
  ProductSeller,
} from "@/api/services/seller.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Get product api for home page and shop page
 * query _id category , keyword, limit and page
 */
export const getProductThunk = createAsyncThunk<
  /**
   * Response type
   */
  Products[],
  /**
   * request type
   */
  GetProductQueryType,
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
  async (query, thunkAPI) => {
    try {
      /**
       * use service
       */
      const { page, area, category, maxPrice, maxSale, minPrice, minSale } =
        query;
      const data = await getProducts({
        page,
        area,
        category,
        maxPrice,
        maxSale,
        minPrice,
        minSale,
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
  SingleProduct,
  /**
   * request type
   */
  string,
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
  async (id, thunkAPI) => {
    try {
      /**
       * use service
       */
      const payload = await getSingleProduct(id);
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
