"use client";
import PageNotFound from "@/app/not-found";
import CartPage from "@/components/cart/page/CartPage";
import CheckoutPage from "@/components/checkout/page/CheckoutPage";
import NotificationPage from "@/components/notification/NotificationPage";
import OrderPage from "@/components/order/page/OrderPage";
import SalePage from "@/components/product/page/SalePage";
import ShopPage from "@/components/product/page/ShopPage";
import CreateNewProductPage from "@/components/seller/page/CreateNewProductPage";
import EditProductPage from "@/components/seller/page/EditProductPage";
import SellerManagerStoreProduct from "@/components/seller/page/SellerManagerStoreProduct";
import ProfilePage from "@/components/user/page/ProfilePage";
import { UserRole } from "@/type/auth.type";
import React from "react";
/**
 * props
 */
type PropTypes = {
  role: UserRole;
  page: string;
};
/**
 * dyamic page
 */
const PAGE: Record<UserRole, Record<string, React.ReactNode>> = {
  user: {
    shop: <ShopPage />,
    "my-cart": <CartPage />,
    "my-order": <OrderPage />,
    sale: <SalePage />,
    profile: <ProfilePage />,
    checkout: <CheckoutPage />,
    "my-notification": <NotificationPage />,
  },
  seller: {
    "manager-product-store": <SellerManagerStoreProduct />,
    "edit-product": <EditProductPage />,
    "add-new-product": <CreateNewProductPage />,
  },
};
/**
 *
 * @returns
 */
export default function RenderPage({ role, page }: PropTypes) {
  return PAGE[role][page] ?? <PageNotFound />;
}
