import {
  ProductList,
  SingleProduct,
  GetProductQueryType,
} from "@/type/product.interface";
import { getProducts, getSingleProduct } from "@/service/product.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Get product api for home page and shop page
 * query _id category , keyword, limit and page
 */
export const getProductThunk = createAsyncThunk<
  /**
   * Response type
   */
  ProductList[],
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
      const data = await getProducts({
        page,
        brand,
        category,
        location,
        max_price,
        max_sale,
        min_price,
        min_sale,
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
