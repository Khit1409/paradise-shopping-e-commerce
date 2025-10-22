import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slice/product_slice/product.slice";
import { authReducer } from "./slice/auth_slice/auth.slice";
import { appReducer } from "./slice/app_slice/app.slice";
import { sellerReducer } from "./slice/seller_slice/seller.slice";
import { orderReducer } from "./slice/order_slice/order.slice";
import { cartReducer } from "./slice/cart_slice/cart.slice";

export const globalStore = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    app: appReducer,
    seller: sellerReducer,
    order: orderReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
