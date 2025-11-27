import { ProductList, SingleProduct } from "@/type/product.interface";
import {
  getEditProductApi,
  getOrderOfSeller,
  getProducts,
  getSingleProductSellerService,
} from "@/service/seller.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  EditProductApiResponse,
  GetOrderForSellerQuery,
} from "@/type/seller.interface";
import { OrderResponseType } from "@/type/order.interface";

export const getSingleProductThunk = createAsyncThunk<
  /**
   * res
   */
  SingleProduct,
  /**
   * req
   */
  string,
  /**
   * error
   */
  { rejectValue: string }
>(
  "single product seller",
  /**
   * handle func
   * @param param0
   * @param thunkAPI
   * @returns
   */
  async (product_id, thunkAPI) => {
    try {
      /**
       * service
       */
      const payload = await getSingleProductSellerService(product_id);
      return payload;
    } catch (error) {
      /**
       * return err
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
  ProductList[],
  /***
   * req
   */
  void,
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
  async (_, thunkAPI) => {
    try {
      /**
       * service
       */
      const payload = await getProducts();

      return payload;
    } catch (error) {
      /**
       * return err
       */
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);

/**
 * get edit product api for edit or create product
 */
export const getEditProductApiThunk = createAsyncThunk<
  EditProductApiResponse[],
  string | undefined,
  { rejectValue: string }
>("get edit api", async (category, thunkAPI) => {
  try {
    const payload = await getEditProductApi(category);
    return payload;
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
/**
 * get order of seller by seller id in cookie
 */
export const getOrderForSellerThunk = createAsyncThunk<
  OrderResponseType[],
  GetOrderForSellerQuery,
  { rejectValue: string }
>("get order for seller", async (query, thunkAPI) => {
  try {
    const payload = await getOrderOfSeller(query);
    return payload;
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
