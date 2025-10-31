import {
  CarouselApiDataType,
  NavigationDataType,
  WardApiType,
} from "../../type/app.interface";
import { createSlice } from "@reduxjs/toolkit";
import {
  getCarouselThunk,
  getNavigationThunk,
} from "./thunk";
/**
 * Type of app slice initial state
 */
interface AppInitialState {
  nav: NavigationDataType[];
  onError: boolean;
  onSuccess: boolean;
  onLoading: boolean;
  message: string | null;
  wardApi: WardApiType[];
  openResponsive: boolean;
  carousel: CarouselApiDataType[];
  reRender: number;
}
/**
 * appInitialState extends type of AppInitialState
 */
const appInitialState: AppInitialState = {
  nav: [],
  message: null,
  onError: false,
  onSuccess: false,
  onLoading: false,
  wardApi: [],
  openResponsive: false,
  carousel: [],
  reRender: Date.now(),
};
/**
 * Slice config and functions
 * @name app
 * @initialState appInitalState
 * @reducer acction using in local component
 */
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
      state.reRender =  Date.now();
      state.onError = action.payload.onError;
      state.message = action.payload.mess;
    },
    //successful modal
    onSuccessfulModel: (state, action) => {
      state.reRender =  Date.now();
      state.onSuccess = action.payload;
    },
    //open responsive mode
    openResponsiveMode: (state) => {
      state.openResponsive = !state.openResponsive;
    },
  },
  /**
   * thunk for handle caching api data to slice state
   * @param builder
   */
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
      })
      //carousel
      .addCase(getCarouselThunk.pending, (state) => {
        state.onLoading = true;
      })
      .addCase(getCarouselThunk.fulfilled, (state, action) => {
        state.onLoading = false;
        state.carousel = action.payload;
      })
      .addCase(getCarouselThunk.rejected, (state, action) => {
        state.onLoading = false;
        state.message = action.payload as string;
      });
  },
});
/**
 * export action
 */
export const {
  onLoadingAction,
  onErrorModel,
  onSuccessfulModel,
  openResponsiveMode,
} = appSlice.actions;
/**
 * export slice
 */
export const appReducer = appSlice.reducer;
