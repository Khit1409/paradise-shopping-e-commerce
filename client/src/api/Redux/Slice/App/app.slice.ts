import {
  NavigationDataType,
  WradApiType,
} from "@/api/interfaces/app.interface";
import { createSlice } from "@reduxjs/toolkit";
import { getNavigationThunk } from "../../Thunk/App/app.thunk";

interface AppInitialState {
  nav: NavigationDataType[];
  onError: boolean;
  onSuccess: boolean;
  onLoading: boolean;
  message: string | null;
  wardApi: WradApiType[];
}

const appInitialState: AppInitialState = {
  nav: [],
  message: null,
  onError: false,
  onSuccess: false,
  onLoading: false,
  wardApi: [],
};

const appSlice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    // loading animation
    onLoadingAction: (state, action) => {
      state.onLoading = action.payload;
    },
    // error modal
    onErrorModel: (
      state,
      action: { payload: { mess: string; onError: boolean } }
    ) => {
      state.onError = action.payload.onError;
      state.message = action.payload.mess;
    },
    //successful modal
    onSuccessfulModel: (state, action) => {
      state.onSuccess = action.payload;
    },
  },
  //extra
  extraReducers: (builder) => {
    builder
      .addCase(getNavigationThunk.pending, (state) => {
        state.onLoading = true;
      })
      .addCase(getNavigationThunk.fulfilled, (state, action) => {
        state.onLoading = false;
        state.nav = action.payload;
      })
      .addCase(getNavigationThunk.rejected, (state, action) => {
        state.onLoading = false;
        state.message = action.payload ?? "error get navigation";
      });
  },
});

export const { onLoadingAction, onErrorModel, onSuccessfulModel } =
  appSlice.actions;
export const appReducer = appSlice.reducer;
