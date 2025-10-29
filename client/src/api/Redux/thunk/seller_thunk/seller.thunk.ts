import {
  getSingleProductSellerService,
  SingleProductSeller,
  upNewProductService,
  UpProductReq,
} from "@/api/services/seller.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Up new product
 */
export const upNewProductThunk = createAsyncThunk<
  /**
   * response
   */
  {
    message: string;
    resultCode: number;
  },
  /**
   * request
   */
  UpProductReq,
  /**
   * error
   */
  { rejectValue: string }
>(
  "up new product",
  /**
   * handle function
   * @param param0
   * @param thunkAPI
   * @returns
   */
  async (
    {
      name,
      cate_slug,
      description,
      hashtag,
      price,
      sale,
      attribute,
      img,
      imgDetail,
    },
    thunkAPI
  ) => {
    try {
      /**
       * service
       */
      const result = await upNewProductService({
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
      return result;
    } catch (error) {
      /**
       * return error
       */
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
export const getSingleProductSellerThunk = createAsyncThunk<
  /**
   * res
   */
  SingleProductSeller,
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
