import { createSlice } from "@reduxjs/toolkit";
import { authenticationThunk, signInThunk } from "../../Thunk/Auth/auth.thunk";
import { UserResponse } from "@/api/services/auth.service";
interface AuthenticateInitialState {
  pendingRequest: boolean;
  isLoggedIn: boolean;
  resultCode: number | null;
  message: string | null;
  user: UserResponse | null;
}

const authInitialState: AuthenticateInitialState = {
  pendingRequest: false,
  resultCode: 0,
  isLoggedIn: false,
  message: null,
  user: null,
};
const authSlice = createSlice({
  name: "Authenticate",
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    //sign in
    builder
      ///
      .addCase(authenticationThunk.pending, (state) => {
        state.pendingRequest = true;
      })
      .addCase(authenticationThunk.fulfilled, (state, action) => {
        state.pendingRequest = false;
        state.isLoggedIn = true;
        state.user = action.payload.api;
      })
      .addCase(authenticationThunk.rejected, (state, action) => {
        state.message = action.payload ?? "Login failed";
        state.user = null;
        state.isLoggedIn = false;
      })
      ///
      .addCase(signInThunk.pending, (state) => {
        state.pendingRequest = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.pendingRequest = false;
        state.resultCode = action.payload.resultCode;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.message = action.payload ?? "Login failed";
      });
  },
});

export const authReducer = authSlice.reducer;
