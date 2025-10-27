import {
  CreatePaymentLinkResponse,
  UserOrderAPIDataType,
} from "@/api/services/order.service";
import { createSlice } from "@reduxjs/toolkit";
import { getUserOrderThunk } from "../../thunk/order_thunk/order.thunk";
/**
 * type of slice
 */
type orderInitialStateType = {
  checkoutState: {
    openModal: boolean;
    value: CreatePaymentLinkResponse | null;
  };
  orderState: OrderState | null;
  orders: UserOrderAPIDataType[];
  pending: boolean;
  orderError: string | null;
};
/**
 * Type of state on initial state
 */
export type OrderState = {
  open: boolean;
  items: {
    productName: string;
    productId: string;
    productImg: string;
    attribute: { attributeName: string; attributeValue: string; }[];
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
  orders: [],
  pending: false,
  orderError: null,
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
          value: CreatePaymentLinkResponse | null;
        };
      }
    ) => {
      //tắt order modal trước khi mở checkout modal
      if (state.orderState) {
        state.orderState.open = false;
        state.orderState.items = null;
      }
      //set state
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
  extraReducers: (builder) => {
    //get user order
    builder
      .addCase(getUserOrderThunk.pending, (state) => {
        state.pending = true;
      })
      .addCase(getUserOrderThunk.fulfilled, (state, action) => {
        state.pending = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrderThunk.rejected, (state, action) => {
        state.pending = false;
        state.orderError = action.payload as string;
      });
  },
});
/**
 * export reducer and action
 */
export const orderReducer = orderSlice.reducer;
export const { checkoutAction, onOpenOrderModal } = orderSlice.actions;
