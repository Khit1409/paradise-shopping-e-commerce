"use client";

import CartPage from "@/pages/user/CartPage";
import OrderPage from "@/pages/user/OrderPage";
import ShopPage from "@/pages/user/ShopPage";
import ManagerStoreProductPage from "@/pages/seller/ManagerStoreProductPage";
import UpdateAccountPage from "@/pages/user/UpdateAccountPage";
import CreateNewProduct from "@/components/seller/page/CreateProduct";
import EditProduct from "@/components/seller/product/EditProduct";

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
  "edit-product": <EditProduct/>,
  "add-new-product": <CreateNewProduct />,
};
/**
 *
 * @param param0
 * @returns
 */
export default function RenderPageContent({ content }: { content: string }) {
  return PAGE_CONTENT[content] ?? null;
}
