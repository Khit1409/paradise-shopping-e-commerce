import { UserAuthenticateResponse } from "@/api/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
import { clietnRegisterThunk } from "../../Thunk/User/user.thunk";

interface UserInitialState {
  userInfo: UserAuthenticateResponse | null;
  message: string | null;
  userSendRequest: boolean;
  resultCode: number | null;
}

const initialState: UserInitialState = {
  userInfo: null,
  message: null,
  userSendRequest: false,
  resultCode: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clietnRegisterThunk.pending, (state) => {
        state.userSendRequest = true;
      })
      .addCase(clietnRegisterThunk.fulfilled, (state) => {
        state.userSendRequest = false;
      })
      .addCase(clietnRegisterThunk.rejected, (state, action) => {
        state.message = action.payload as string;
        state.userSendRequest = false;
      });
  },
});

export const userReducer = userSlice.reducer;
