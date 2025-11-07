import { Products, SingleProduct } from "../../type/product.interface";
import {
  getProducts,
  getSingleProductSellerService,
} from "../../service/seller.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSingleProductThunk = createAsyncThunk<
  /**
   * res
   */
  SingleProduct,
  /**
   * req
   */
  { product_id: string },
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
  async ({ product_id }, thunkAPI) => {
    try {
      /**
       * service
       */
      const payload = await getSingleProductSellerService({
        product_id,
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
/**
 * Get product for seller manager product
 */
export const getProductSellerThunk = createAsyncThunk<
  /**
   * res
   */
  Products[],
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
