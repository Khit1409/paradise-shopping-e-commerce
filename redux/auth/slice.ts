import { createSlice } from "@reduxjs/toolkit";
import { authenticationThunk } from "./thunk";
import { AuthenticatedUserResponse } from "@/type/auth.type";
/**
 * type of authentication using for authInitialState of auth slice
 */
interface AuthenticateInitialState {
  pendingRequest: boolean;
  isLoggedIn: boolean;
  resultCode: number | null;
  message: string | null;
  user: AuthenticatedUserResponse | null;
}
/**
 * intitalstate of authSlice with type of AuthenticatInitialState
 */
const authInitialState: AuthenticateInitialState = {
  pendingRequest: false,
  resultCode: 0,
  isLoggedIn: false,
  message: null,
  user: null,
};
/**
 * authSlice using for local componet authentication user
 * @name Authentication
 * @initialState AuthenticateInitialState
 * @reducer now is {}
 */
const authSlice = createSlice({
  name: "Authenticate",
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // authentication user
    builder
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
      });
  },
});
/**
 * export reducer here
 */
export const authReducer = authSlice.reducer;
