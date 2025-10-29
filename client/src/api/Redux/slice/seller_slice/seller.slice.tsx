import { Products, SingleProduct } from "@/api/interfaces/product.interface";
import { createSlice } from "@reduxjs/toolkit";
import {
  getProductThunk,
  getSingleProductThunk,
} from "../../thunk/seller_thunk/seller.thunk";

// interface of sellerInitialState of seller slice
interface SellerSliceInitialState {
  products: Products[];
  product: SingleProduct | null;
  sellerOnloading: boolean;
  sellerErrMess: string;
}
/**
 * initial state of seller slice
 */
const sellerInitialState: SellerSliceInitialState = {
  product: null,
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
      .addCase(getProductThunk.pending, (state) => {
        state.sellerOnloading = true;
      })
      .addCase(getProductThunk.fulfilled, (state, action) => {
        state.products = action.payload;
        state.sellerOnloading = false;
      })
      .addCase(getProductThunk.rejected, (state, action) => {
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
      });
  },
});
/**
 * export reducer here
 */
export const sellerReducer = sellerSlice.reducer;
