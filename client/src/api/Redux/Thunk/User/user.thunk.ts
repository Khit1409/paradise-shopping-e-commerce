import {
  CreateNewStoreRequest,
  createNewStoreService,
} from "@/api/services/seller.service";
import {
  clietnRegisterService,
  RegisterType,
} from "@/api/services/user.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
/**
 * client login function
 * get password and email
 * send request to server , create token send to cookie and
 * response message and resultCode
 */
export const clietnRegisterThunk = createAsyncThunk<
  /**
   * Response type
   */
  { message: string; resultCode: number },
  /**
   * Request type
   */
  RegisterType,
  /**
   * thunk error response
   */
  { rejectValue: string }
>(
  "register",
  /**
   * Async fucntion
   * @param param0
   * @param thunkAPI
   * @returns
   */
  async (
    {
      user_email,
      user_firtname,
      user_lastname,
      user_password,
      user_phone,
      user_avatar,
      user_address,
    },
    thunkAPI
  ) => {
    try {
      /**
       * use service for send request to client
       */
      const res = await clietnRegisterService({
        user_email,
        user_firtname,
        user_lastname,
        user_password,
        user_phone,
        user_avatar,
        user_address,
      });
      const payload = res;
      return payload;
    } catch (error) {
      /**
       * return rejectValue
       */
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
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
