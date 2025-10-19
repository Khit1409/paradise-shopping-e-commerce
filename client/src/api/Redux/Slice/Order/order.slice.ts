import { CreatePaymentLinkResponse } from "@/api/services/order.service";
import { createSlice } from "@reduxjs/toolkit";
/**
 * type of slice
 */
type orderInitialStateType = {
  checkoutState: {
    openModal: boolean;
    value: CreatePaymentLinkResponse | null;
  };
  orderState: OrderState | null;
};
/**
 * Type of state on initial state
 */
type OrderState = {
  open: boolean;
  items: {
    productId: string;
    productImg: string;
    attribute: { attrName: string; itemValue: string; itemImg?: string }[];
    totalPrice: number;
    quantity: number;
  } | null;
};
/**
 * Order initialstate
 */
const orderInitialState: orderInitialStateType = {
  checkoutState: {
    openModal: false,
    value: null,
  },
  orderState: { open: false, items: null },
};
/**
 * Order slice
 */
const orderSlice = createSlice({
  initialState: orderInitialState,
  name: "order",
  reducers: {
    /**
     * action set checkout value
     * @param state
     * @param action
     */
    checkoutAction: (
      state,
      action: {
        payload: {
          openModal: boolean;
          value: CreatePaymentLinkResponse;
        };
      }
    ) => {
      if (state.orderState) {
        state.orderState.open = false;
      }
      state.checkoutState = action.payload;
    },
    /**
     * Open order modal
     * @param state
     * @param action
     */
    onOpenOrderModal: (state, action: { payload: OrderState }) => {
      state.orderState = action.payload;
    },
  },
});
/**
 * export reducer and action
 */
export const orderReducer = orderSlice.reducer;
export const { checkoutAction, onOpenOrderModal } = orderSlice.actions;
