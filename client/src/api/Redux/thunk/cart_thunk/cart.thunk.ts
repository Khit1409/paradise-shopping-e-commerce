import { AddToCartType, UserCart } from "@/api/interfaces/cart.interface";
import { addToCartServicer, getUserCartService } from "@/api/services/cart.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

/***
 * Add to cart thunk
 */
export const addToCartThunk = createAsyncThunk<
  // response
  { message: string; resultCode: number },
  //request
  AddToCartType,
  //error
  { rejectValue: string }
>(
  "add to cart",
  //handle
  async ({ img, name, price, proId, quantity, choose }, thunkAPI) => {
    try {
      const result = await addToCartServicer({
        img,
        name,
        price,
        proId,
        quantity,
        choose,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
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
