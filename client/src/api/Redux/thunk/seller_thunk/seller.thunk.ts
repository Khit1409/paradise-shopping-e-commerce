import {
  deleteActionSingleProductService,
  DeleteReq,
  getSingleProductSellerService,
  // SellerUpdateProductRequest,
  // sellerUpdateProductService,
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
// /***
//  * update product
//  */
// export const updateProductThunk = createAsyncThunk<
//   /**
//    * response type
//    */
//   { message: string; resultCode: number },
//   /**
//    * req type
//    */
//   SellerUpdateProductRequest,
//   /**
//    * error res
//    */
//   { rejectValue: string }
// >(
//   "update product",
//   /**
//    * thunk func
//    * @param param0
//    * @param thunkAPI
//    * @returns
//    */
//   async (
//     {
//       attribute,
//       product_id,
//       imgDetail,
//       proCateSlug,
//       proDescription,
//       proImg,
//       proName,
//       proPrice,
//       proSale,
//     },
//     thunkAPI
//   ) => {
//     try {
//       /**
//        * use service
//        */
//       const result = await sellerUpdateProductService({
//         attribute,
//         product_id,
//         imgDetail,
//         proCateSlug,
//         proDescription,
//         proImg,
//         proName,
//         proPrice,
//         proSale,
//       });
//       return result;
//     } catch (error) {
//       /**
//        * return err
//        */
//       return thunkAPI.rejectWithValue(`${error}`);
//     }
//   }
// );
/**
 * get single product for seller manager
 */
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

/**
 * Delete action in single product
 */
export const deleteActionSingleProductThunk = createAsyncThunk<
  //response
  { message: string; resultCode: number },
  //req
  DeleteReq,
  //error
  { rejectValue: string }
>(
  //name
  "delete action single product",
  //handle func
  async ({ attribute, attributeItem, imgDetail, proId }, thunkAPI) => {
    try {
      const res = await deleteActionSingleProductService({
        attribute,
        proId,
        attributeItem,
        imgDetail,
      });
      const payload = res;
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
