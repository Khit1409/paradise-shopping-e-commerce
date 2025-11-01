"use client";

import OrderPage from "@/components/order/page/OrderPage";
import CreateNewProduct from "@/components/seller/manager-product/create/CreateProduct";
import CartPage from "@/components/cart/page/CartPage";
import ShopPage from "@/components/product/page/ShopPage";
import SalePage from "@/components/product/page/SalePage";
import ProfileSetting from "@/components/user/ProductSetting";
import CheckoutOrder from "@/components/checkout/CheckoutOrder";
import EditProduct from "@/components/seller/manager-product/edit/EditProduct";
import SellerManagerStoreProduct from "@/components/seller/page/SellerManagerStoreProduct";

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
  },
  seller: {
    "manager-product-store": <SellerManagerStoreProduct />,
    "edit-product": <EditProduct />,
    "add-new-product": <CreateNewProduct />,
    "checkout-my-order": <CheckoutOrder />,
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
