import { createAsyncThunk } from "@reduxjs/toolkit";

import { OrderResponseType } from "@/type/order.interface";
import { getOrder } from "@/service/order.service";

/**
 * @description get user order by id in cookie
 * @param param0
 */
export const getOrderThunk = createAsyncThunk<
  OrderResponseType[],
  void,
  { rejectValue: string }
>("get user order", async (_, thunkAPI) => {
  try {
    const payload = await getOrder();
    return payload;
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
