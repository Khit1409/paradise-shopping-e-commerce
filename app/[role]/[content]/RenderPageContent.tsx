"use client";

import OrderPage from "@/components/order/page/OrderPage";

import CartPage from "@/components/cart/page/CartPage";
import ShopPage from "@/components/product/page/ShopPage";
import SalePage from "@/components/product/page/SalePage";
import ProfileSetting from "@/components/user/ProfileSetting";

import SellerManagerStoreProduct from "@/components/seller/page/SellerManagerStoreProduct";
import CheckoutPage from "@/components/checkout/page/CheckoutPage";
import EditProductPage from "@/components/seller/page/EditProductPage";
import CreateNewProductPage from "@/components/seller/page/CreateNewProductPage";

type Role = "user" | "seller";

/**
 * render page follow url when navigation page
 * string => components
 */
const PAGE_CONTENT: Record<Role, Record<string, React.ReactNode>> = {
  user: {
    shop: <ShopPage />, //
    "my-cart": <CartPage />, //
    "my-order": <OrderPage />,
    sale: <SalePage />,
    profile: <ProfileSetting />,
    checkout: <CheckoutPage />,
  },
  seller: {
    "manager-product-store": <SellerManagerStoreProduct />,
    "edit-product": <EditProductPage />,
    "add-new-product": <CreateNewProductPage/>,
  },
};
/**
 *
 * @param param0
 * @returns
 */
export default function RenderPageContent({
  role,
  content,
}: {
  role: Role;
  content: string;
}) {
  return PAGE_CONTENT[role][content] ?? null;
}
