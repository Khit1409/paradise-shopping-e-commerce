import { createSlice } from "@reduxjs/toolkit";
import {
  getHomeProductThunk,
  getProductSellerThunk,
  getProductShopThunk,
  getSingleProductThunk,
  getUserCartThunk,
} from "../../thunk/product_thunk/product.thunk";
import {
  Product,
  ProductShopPage,
  SingelProductDataResponse,
  UserCart,
} from "@/api/interfaces/product.interface";
import {
  ProductSeller,
  SingleProductSeller,
} from "@/api/services/seller.service";
/**
 * interface of productInitialState of product slice
 */
interface ProductInitialState {
  errorMessage: string | null;
  productShop: ProductShopPage[];
  sendRequest: boolean;
  spSeller: SingleProductSeller | null;
  productSellerApi: ProductSeller[];
  productApi: Product[];
  singleProduct: SingelProductDataResponse | null;
  carts: UserCart[];
}

/**
 * inital state of product slice
 */
const productInitialState: ProductInitialState = {
  errorMessage: null,
  productApi: [],
  sendRequest: false,
  productSellerApi: [],
  spSeller: null,
  productShop: [],
  carts: [],
  singleProduct: null,
};
/**
 * product slice
 * @name Product
 * @reducer now is {}
 * @intitalState productInitialState
 */
const productSlice = createSlice({
  name: "Product",
  reducers: {},
  initialState: productInitialState,
  extraReducers: (builder) => {
    builder
      // Case get all products
      .addCase(getHomeProductThunk.pending, (state) => {
        state.sendRequest = true;
      })
      .addCase(getHomeProductThunk.fulfilled, (state, action) => {
        state.productApi = action.payload;
        state.sendRequest = false;
      })
      .addCase(getHomeProductThunk.rejected, (state, action) => {
        state.errorMessage = action.payload ?? "Error";
        state.sendRequest = false;
      })
      //get single product
      .addCase(getSingleProductThunk.pending, (state) => {
        state.sendRequest = true;
      })
      .addCase(getSingleProductThunk.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        state.sendRequest = false;
      })
      .addCase(getSingleProductThunk.rejected, (state, action) => {
        state.errorMessage = action.payload ?? "Error";
        state.sendRequest = false;
      })
      //get product shop page
      .addCase(getProductShopThunk.pending, (state) => {
        state.sendRequest = true;
      })
      .addCase(getProductShopThunk.fulfilled, (state, action) => {
        state.productShop = action.payload;
        state.sendRequest = false;
      })
      .addCase(getProductShopThunk.rejected, (state, action) => {
        state.errorMessage = action.payload ?? "Error";
        state.sendRequest = false;
      })
      //get product for seller manager product page
      .addCase(getProductSellerThunk.pending, (state) => {
        state.sendRequest = true;
      })
      .addCase(getProductSellerThunk.fulfilled, (state, action) => {
        state.productSellerApi = action.payload;
        state.sendRequest = false;
      })
      .addCase(getProductSellerThunk.rejected, (state, action) => {
        state.errorMessage = action.payload ?? "Error";
        state.sendRequest = false;
      })
      //get cart for user
      .addCase(getUserCartThunk.pending, (state) => {
        state.sendRequest = true;
      })
      .addCase(getUserCartThunk.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.sendRequest = false;
      })
      .addCase(getUserCartThunk.rejected, (state, action) => {
        state.errorMessage = action.payload ?? "Error";
        state.sendRequest = false;
      });
  },
});
/**
 * export reducer header
 */
export const productReducer = productSlice.reducer;
