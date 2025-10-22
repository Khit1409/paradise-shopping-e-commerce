import {
  Authentication,
  signIn,
  UserResponse,
} from "@/api/services/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
/**
 * check Client login state (user/admin/employee)
 * this function help the website manager sign in state
 * for get user, admin, employee and more information
 * change button login and logout on header page
 * manager role on login state is true
 */
export const authenticationThunk = createAsyncThunk<
  //response
  { api: UserResponse| null; role: "user" | "seller" },
  //request
  { role: "user" | "seller" },
  //error
  { rejectValue: string }
>("authentication", async ({ role }, thunkAPI) => {
  try {
    const payload = await Authentication(role);
    return { api: payload, role: role };
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
/**
 * Logout, clear cookie
 * cleaer session sigin for client
 */
export const clientLogout = createAsyncThunk<
  { message: string; resultCode: number },
  void,
  { rejectValue: string }
>("logout", async (_, thunkAPI) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/client_logout`,
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
