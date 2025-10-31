import { UserCart } from "../../type/cart.interface";
import { getUserCartService } from "../../service/cart.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * get user cart thunk
 */
export const getUserCartThunk = createAsyncThunk<
  UserCart[],
  void,
  { rejectValue: string }
>(
  //name
  "get user cart",
  //handle
  async (_, thunkAPI) => {
    try {
      const result = await getUserCartService();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
