import { Products, SingleProduct } from "@/api/interfaces/product.interface";
import {
  getProducts,
  getSingleProductSellerService,
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
export const getProductThunk = createAsyncThunk<
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
