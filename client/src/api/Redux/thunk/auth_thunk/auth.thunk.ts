import {
  Authentication,
  signIn,
  UserResponse,
} from "@/api/services/auth.service";
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
  { api: UserResponse | null},
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
/**
 * Client login
 * This function help client send login request to server
 * and get resultCode for next function is check login
 */
export const signInThunk = createAsyncThunk<
  { message: string; resultCode: number },
  { email: string; password: string; role: "user" | "seller" },
  { rejectValue: string }
>("login", async ({ email, password, role }, thunkAPI) => {
  try {
    const result = await signIn({ email, password, role });
    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
