import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./product/slice";
import { authReducer } from "./auth/slice";
import { appReducer } from "./app/slice";
import { sellerReducer } from "./seller/slice";
import { orderReducer } from "./order/slice";
import { cartReducer } from "./cart/slice";
import { checkoutReducer } from "./checkout/slice";

export const globalStore = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    app: appReducer,
    seller: sellerReducer,
    order: orderReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
