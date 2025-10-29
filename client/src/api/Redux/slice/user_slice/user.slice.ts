import { UserAuthenticateResponse } from "@/api/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
import {} from "../../thunk/user_thunk/user.thunk";

/**
 * Interface userinitialState of userSlice
 */
interface UserInitialState {
  userInfo: UserAuthenticateResponse | null;
  message: string | null;
  userSendRequest: boolean;
  resultCode: number | null;
}

/**
 * initialState of user slice
 */
const initialState: UserInitialState = {
  userInfo: null,
  message: null,
  userSendRequest: false,
  resultCode: null,
};
/**
 * User slice
 * @name User
 * @initialState type is UserInitialState
 * @reducer now is {}
 */
const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
    //register
  },
});
/**
 * export reducer here
 */
export const userReducer = userSlice.reducer;
