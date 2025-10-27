import {
  getUserOrders,
  UserOrderAPIDataType,
} from "@/api/services/order.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
/**
 * @description get user order by id in cookie
 * @param param0
 * @returns {UserOrderAPIDataType}
 */
export const getUserOrderThunk = createAsyncThunk<
  UserOrderAPIDataType[],
  void,
  { rejectValue: string }
>("get user order", async (_, thunkAPI) => {
  try {
    const payload = await getUserOrders();
    return payload;
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
