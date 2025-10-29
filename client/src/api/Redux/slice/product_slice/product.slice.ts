import { createSlice } from "@reduxjs/toolkit";
import {
  getProductThunk,
  getSingleProductThunk,
} from "../../thunk/product_thunk/product.thunk";
import { Products, SingleProduct } from "@/api/interfaces/product.interface";
/**
 * interface of productInitialState of product slice
 */
interface ProductInitialState {
  errorMessage: string | null;
  sendRequest: boolean;
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
      });
  },
});
/**
 * export reducer header
 */
export const productReducer = productSlice.reducer;
