import { ProductList, SingleProduct } from "../../type/product.interface";
import { createSlice } from "@reduxjs/toolkit";
import {
  getEditProductApiThunk,
  getOrderForSellerThunk,
  getProductSellerThunk,
  getSingleProductThunk,
} from "./thunk";
import { EditProductApiResponse } from "@/type/seller.interface";
import { OrderResponseType } from "@/type/order.interface";

// interface of sellerInitialState of seller slice
interface SellerSliceInitialState {
  products: ProductList[];
  orders: OrderResponseType[];
  product: SingleProduct | null;
  editProduct: EditProductApiResponse[];
  sellerOnloading: boolean;
  sellerErrMess: string;
}
/**
 * initial state of seller slice
 */
const sellerInitialState: SellerSliceInitialState = {
  editProduct: [],
  product: null,
  orders: [],
  products: [],
  sellerOnloading: false,
  sellerErrMess: "",
};
/**
 * seller slice
 * @name seller
 * @reducer now is {}
 * @initialState sellerInititalState
 */
const sellerSlice = createSlice({
  name: "seller",
  reducers: {},
  initialState: sellerInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductSellerThunk.pending, (state) => {
        state.sellerOnloading = true;
      })
      .addCase(getProductSellerThunk.fulfilled, (state, action) => {
        state.products = action.payload;
        state.sellerOnloading = false;
      })
      .addCase(getProductSellerThunk.rejected, (state, action) => {
        state.sellerErrMess = action.payload ?? "Error";
        state.sellerOnloading = false;
      })
      //get single product for update
      .addCase(getSingleProductThunk.pending, (state) => {
        state.sellerOnloading = true;
      })
      .addCase(getSingleProductThunk.fulfilled, (state, action) => {
        state.product = action.payload;
        state.sellerOnloading = false;
      })
      .addCase(getSingleProductThunk.rejected, (state, action) => {
        state.sellerErrMess = action.payload ?? "Error";
        state.sellerOnloading = false;
      })
      //get edit product api
      .addCase(getEditProductApiThunk.pending, (state) => {
        state.sellerOnloading = true;
      })
      .addCase(getEditProductApiThunk.fulfilled, (state, action) => {
        state.sellerOnloading = false;
        state.editProduct = action.payload;
      })
      .addCase(getEditProductApiThunk.rejected, (state, action) => {
        state.sellerErrMess = action.payload as string;
      })
      //get order
      .addCase(getOrderForSellerThunk.pending, (state) => {
        state.sellerOnloading = true;
      })
      .addCase(getOrderForSellerThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.sellerOnloading = false;
      })
      .addCase(getOrderForSellerThunk.rejected, (state, action) => {
        state.sellerErrMess = action.payload as string;
      });
  },
});
/**
 * export reducer here
 */
export const sellerReducer = sellerSlice.reducer;
