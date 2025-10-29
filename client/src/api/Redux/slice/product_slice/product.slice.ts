import { createSlice } from "@reduxjs/toolkit";
import {
  getProductSellerThunk,
  getProductThunk,
  getSingleProductThunk,
} from "../../thunk/product_thunk/product.thunk";
import {
  Products,
  SingleProduct,
} from "@/api/interfaces/product.interface";
import {
  ProductSeller,
  SingleProductSeller,
} from "@/api/services/seller.service";
/**
 * interface of productInitialState of product slice
 */
interface ProductInitialState {
  errorMessage: string | null;
  sendRequest: boolean;
  spSeller: SingleProductSeller | null;
  productSellerApi: ProductSeller[];
  products: Products[];
  product: SingleProduct | null;
}

/**
 * inital state of product slice
 */
const productInitialState: ProductInitialState = {
  errorMessage: null,
  products: [],
  sendRequest: false,
  productSellerApi: [],
  spSeller: null,
  product: null,
};
/**
 * product slice
 * @name Product
 * @reducer now is {}
 * @intitalState productInitialState
 */
const productSlice = createSlice({
  name: "Product",
  reducers: {},
  initialState: productInitialState,
  extraReducers: (builder) => {
    builder
      // Case get all products
      .addCase(getProductThunk.pending, (state) => {
        state.sendRequest = true;
      })
      .addCase(getProductThunk.fulfilled, (state, action) => {
        state.products = action.payload;
        state.sendRequest = false;
      })
      .addCase(getProductThunk.rejected, (state, action) => {
        state.errorMessage = action.payload ?? "Error";
        state.sendRequest = false;
      })
      //get single product
      .addCase(getSingleProductThunk.pending, (state) => {
        state.sendRequest = true;
      })
      .addCase(getSingleProductThunk.fulfilled, (state, action) => {
        state.product = action.payload;
        state.sendRequest = false;
      })
      .addCase(getSingleProductThunk.rejected, (state, action) => {
        state.errorMessage = action.payload ?? "Error";
        state.sendRequest = false;
      })
      //get product for seller manager product page
      .addCase(getProductSellerThunk.pending, (state) => {
        state.sendRequest = true;
      })
      .addCase(getProductSellerThunk.fulfilled, (state, action) => {
        state.productSellerApi = action.payload;
        state.sendRequest = false;
      })
      .addCase(getProductSellerThunk.rejected, (state, action) => {
        state.errorMessage = action.payload ?? "Error";
        state.sendRequest = false;
      });
  },
});
/**
 * export reducer header
 */
export const productReducer = productSlice.reducer;
