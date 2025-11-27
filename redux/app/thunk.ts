import {
  NotificationData,
  ProvinceApiType,
  UIDataResponse,
  WardApiType,
} from "@/type/app.interface";
import {
  getAddressService,
  getUI,
  getUserNotification,
} from "@/service/app.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * get app navtigation api
 */
export const getUIThunk = createAsyncThunk<
  UIDataResponse,
  void,
  { rejectValue: string }
>("navigation_app", async (_, thunkAPI) => {
  try {
    const payload = await getUI();
    return payload;
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
/**
 * get address
 */
export const getAddressThunk = createAsyncThunk<
  { province: ProvinceApiType[]; ward: WardApiType[] },
  void,
  { rejectValue: string }
>("address api", async (_, thunkAPI) => {
  try {
    const payload = await getAddressService();
    return payload;
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
/**
 * get notificate
 */
export const getUserNotificationThunk = createAsyncThunk<NotificationData[]>(
  "user notificate",
  async (_, thunkAPI) => {
    try {
      const payload = await getUserNotification();
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as string);
    }
  }
);
