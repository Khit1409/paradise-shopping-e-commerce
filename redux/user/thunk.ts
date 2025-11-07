import {
  CreateNewStoreRequest,
  createNewStoreService,
} from "../../service/seller.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * User register become to seller
 * and create new store
 */
export const createNewStoreThunk = createAsyncThunk<
  /**
   * Response type
   */
  { message: string; resultCode: number },
  /**
   * request type
   */
  CreateNewStoreRequest,
  /**
   * error thunk response
   */
  {
    rejectValue: string;
  }
>(
  "create store",
  /**
   * async function thunk
   * @param param0
   * @param thunkAPI
   */
  async (
    {
      owner_id,
      store_address,
      store_area,
      store_area_slug,
      store_email,
      store_name,
      store_password,
      store_phone,
    },
    thunkAPI
  ) => {
    try {
      /**
       * use service
       */
      const result = await createNewStoreService({
        owner_id,
        store_address,
        store_area,
        store_area_slug,
        store_email,
        store_name,
        store_password,
        store_phone,
      });
      /**
       * return payload for slice
       */
      const payload = result;
      return payload;
    } catch (error) {
      /**
       * return rejectValue
       */
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
