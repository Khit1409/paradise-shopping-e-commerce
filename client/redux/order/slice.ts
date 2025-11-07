import { OrderResponseType, OrderSliceState } from "@/type/order.interface";
import { createSlice } from "@reduxjs/toolkit";
import { getOrderThunk } from "./thunk";
/**
 * type of slice
 */
type orderInitialStateType = {
  orderState: OrderSliceState | null;
  pending: boolean;
  orderError: string | null;
  orders: OrderResponseType[];
};
/**
 * Type of state on initial state
 */

/**
 * Order initialstate
 */
const orderInitialState: orderInitialStateType = {
  orders: [],
  orderState: null,
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
     * Open order modal
     * @param state
     * @param action
     */
    onOpenOrderModal: (state, action: { payload: OrderSliceState | null }) => {
      state.orderState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderThunk.pending, (state) => {
        state.pending = true;
      })
      .addCase(getOrderThunk.fulfilled, (state, action) => {
        state.pending = false;
        state.orders = action.payload;
      })
      .addCase(getOrderThunk.rejected, (state, action) => {
        state.pending = false;
        state.orderError = action.error as string;
      });
    //get user order
  },
});
/**
 * export reducer and action
 */
export const orderReducer = orderSlice.reducer;
export const { onOpenOrderModal } = orderSlice.actions;
