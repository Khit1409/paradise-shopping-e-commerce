import { createSlice } from "@reduxjs/toolkit";
import { getCartThunk } from "./thunk";
import { Cart } from "@/type/cart.interface";

interface CartInitialState {
  sendRequest: boolean;
  carts: Cart[];
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
      .addCase(getCartThunk.pending, (state) => {
        state.sendRequest = true;
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.sendRequest = false;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.errorMessage = action.payload ?? "Error";
        state.sendRequest = false;
      });
  },
});

/**
 * export reducer here
 */
export const cartReducer = cartSlice.reducer;
