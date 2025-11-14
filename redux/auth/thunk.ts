import { AuthenticatedUserResponse } from "@/type/auth.type";
import { Authentication } from "../../service/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
/**
 * check Client login state (user/admin/employee)
 * this function help the website manager sign in state
 * for get user, admin, employee and more information
 * change button login and logout on header page
 * manager role on login state is true
 */
export const authenticationThunk = createAsyncThunk<
  AuthenticatedUserResponse | null,
  "seller" | "user",
  { rejectValue: string }
>("authentication", async (role, thunkAPI) => {
  try {
    const payload = await Authentication(role);
    return payload;
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
