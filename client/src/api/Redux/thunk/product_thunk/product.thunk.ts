import {
  Products,
  SingleProduct,
  GetProductQueryType,
} from "@/api/interfaces/product.interface";
import { getProducts, getSingleProduct } from "@/api/services/product.service";
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