import { getCart } from "@/service/cart.service";
import { Cart } from "@/type/cart.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * get user cart thunk
 */
export const getCartThunk = createAsyncThunk<
  Cart[],
  void,
  { rejectValue: string }
>(
  //name
  "get user cart",
  //handle
  async (_, thunkAPI) => {
    try {
      const result = await getCart();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
