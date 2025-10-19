import { SingleProductSeller } from "@/api/services/seller.service";
import { createSlice } from "@reduxjs/toolkit";
import { getSingleProductSellerThunk } from "../../Thunk/Seller/seller.thunk";

type SellerSliceInitialState = {
  spSeller: SingleProductSeller | null;
  sellerOnloading: boolean;
  sellerErrMess: string;
};

const sellerInitialState: SellerSliceInitialState = {
  spSeller: null,
  sellerOnloading: false,
  sellerErrMess: "",
};
const sellerSlice = createSlice({
  name: "seller",
  reducers: {},
  initialState: sellerInitialState,
  extraReducers: (builder) => {
    builder
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

export const sellerReducer = sellerSlice.reducer;
