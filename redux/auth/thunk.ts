import { Authentication, UserResponse } from "../../service/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
/**
 * check Client login state (user/admin/employee)
 * this function help the website manager sign in state
 * for get user, admin, employee and more information
 * change button login and logout on header page
 * manager role on login state is true
 */
export const authenticationThunk = createAsyncThunk<
  //response
  { api: UserResponse | null },
  void,
  { rejectValue: string }
>("authentication", async (_, thunkAPI) => {
  try {
    const payload = await Authentication();
    return { api: payload };
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
