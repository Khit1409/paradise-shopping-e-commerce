"use client";

import UserUpdateAccountPage from "@/components/accounts/update/user";
import CartPage from "@/components/carts";
import OrderPage from "@/components/order_page";
import ProductShopPage from "@/components/product_page_section/pages/ProductShopPage";
import UpNewProductPage from "@/components/seller/manager_store/manager_store_products/create_products";
import UpdateProductSinglePage from "@/components/seller/manager_store/manager_store_products/update_products";
import SellerProductSection from "@/components/seller/section_page/SellerProductSection";

/**
 * render page follow url when navigation page
 * string => components
 */
const PAGE_CONTENT: Record<string, React.ReactNode> = {
  shop: <ProductShopPage />,
  manager_product_store: <SellerProductSection />,
  update_single_product: <UpdateProductSinglePage />,
  add_new_product: <UpNewProductPage />,
  my_cart: <CartPage />,
  setting_account: <UserUpdateAccountPage />,
  my_order: <OrderPage />,
};
/**
 *
 * @param param0
 * @returns
 */
export default function RenderPageContent({ content }: { content: string }) {
  return PAGE_CONTENT[content] ?? null;
}
