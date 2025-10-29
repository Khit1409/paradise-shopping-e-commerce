"use client";

import CartPage from "@/pages/user/CartPage";
import OrderPage from "@/pages/user/OrderPage";
import ShopPage from "@/pages/user/ShopPage";
import UpdateSingleProductPage from "@/pages/seller/UpdateSingleProductPage";
import ManagerStoreProductPage from "@/pages/seller/ManagerStoreProductPage";
import UpNewProductPage from "@/pages/seller/UpNewProductPage";
import UpdateAccountPage from "@/pages/user/UpdateAccountPage";

/**
 * render page follow url when navigation page
 * string => components
 */
const PAGE_CONTENT: Record<string, React.ReactNode> = {
  /**
   * user page contents
   */
  shop: <ShopPage />,
  "my-cart": <CartPage />,
  "my-order": <OrderPage />,
  sale: (
    <div className="h-screen w-screen flex items-center justify-center my-1 bg-white uppercase">
      <p className="text-center">Hiện chưa có chương trình khuyến mại nào!</p>
    </div>
  ),
  "setting-account": <UpdateAccountPage />,
  /**
   * seller page content
   */
  "manager-product-store": <ManagerStoreProductPage />,
  "update-single-product": <UpdateSingleProductPage />,
  "add-new-product": <UpNewProductPage />,
};
/**
 *
 * @param param0
 * @returns
 */
export default function RenderPageContent({ content }: { content: string }) {
  return PAGE_CONTENT[content] ?? null;
}
