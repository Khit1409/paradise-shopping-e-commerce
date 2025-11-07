import { CreatePaymentLinkResponse } from "@/type/order.interface";
import { createSlice } from "@reduxjs/toolkit";

interface CheckoutState {
  onCheckout: boolean;
  checkoutValue: CreatePaymentLinkResponse | null;
}

const checkoutInitialState: CheckoutState = {
  onCheckout: false,
  checkoutValue: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: checkoutInitialState,
  reducers: {
    changeCheckoutValue: (
      state,
      action: { payload: CreatePaymentLinkResponse | null }
    ) => {
      state.checkoutValue = action.payload;
    },
    onCheckoutModal: (state) => {
      state.onCheckout = !state.onCheckout;
    },
  },
  extraReducers: () => {},
});

export const checkoutReducer = checkoutSlice.reducer;
export const { changeCheckoutValue } = checkoutSlice.actions;
