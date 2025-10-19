import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./Slice/Product/product.slice";
import { authReducer } from "./Slice/Auth/auth.slice";
import { appReducer } from "./Slice/App/app.slice";
import { sellerReducer } from "./Slice/Seller/seller.slice";
import { orderReducer } from "./Slice/Order/order.slice";

export const globalStore = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    app: appReducer,
    seller: sellerReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
