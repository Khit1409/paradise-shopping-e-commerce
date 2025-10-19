import {
  NavigationDataType,
  ProvinceApiType,
  WradApiType,
} from "@/api/interfaces/app.interface";
import {
  getAddressService,
  getNavigationService,
} from "@/api/services/app.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * get app navtigation api
 */
export const getNavigationThunk = createAsyncThunk<
  NavigationDataType[],
  void,
  { rejectValue: string }
>("navigation_app", async (_, thunkAPI) => {
  try {
    const payload = await getNavigationService();
    return payload;
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
/**
 * get address
 */

export const getAddressThunk = createAsyncThunk<
  { province: ProvinceApiType[]; ward: WradApiType[] },
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
