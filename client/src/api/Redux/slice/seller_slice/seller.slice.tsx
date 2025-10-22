import { SingleProductSeller } from "@/api/services/seller.service";
import { createSlice } from "@reduxjs/toolkit";
import { getSingleProductSellerThunk } from "../../thunk/seller_thunk/seller.thunk";

// interface of sellerInitialState of seller slice
interface SellerSliceInitialState {
  spSeller: SingleProductSeller | null;
  sellerOnloading: boolean;
  sellerErrMess: string;
}
/**
 * initial state of seller slice
 */
const sellerInitialState: SellerSliceInitialState = {
  spSeller: null,
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
      //get single product for update
      .addCase(getSingleProductSellerThunk.pending, (state) => {
        state.sellerOnloading = true;
      })
      .addCase(getSingleProductSellerThunk.fulfilled, (state, action) => {
        state.spSeller = action.payload;
        state.sellerOnloading = false;
      })
      .addCase(getSingleProductSellerThunk.rejected, (state, action) => {
        state.sellerErrMess = action.payload ?? "Error";
        state.sellerOnloading = false;
      });
  },
});
/**
 * export reducer here
 */
export const sellerReducer = sellerSlice.reducer;
