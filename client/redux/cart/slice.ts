import { UserCart } from "../../type/cart.interface";
import { createSlice } from "@reduxjs/toolkit";
import { getUserCartThunk } from "./thunk";

interface CartInitialState {
  sendRequest: boolean;
  carts: UserCart[];
  errorMessage: string;
}

const cartInitialState: CartInitialState = {
  carts: [],
  sendRequest: false,
  errorMessage: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder //get cart for user
      .addCase(getUserCartThunk.pending, (state) => {
        state.sendRequest = true;
      })
      .addCase(getUserCartThunk.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.sendRequest = false;
      })
      .addCase(getUserCartThunk.rejected, (state, action) => {
        state.errorMessage = action.payload ?? "Error";
        state.sendRequest = false;
      });
  },
});

/**
 * export reducer here
 */
export const cartReducer = cartSlice.reducer;
