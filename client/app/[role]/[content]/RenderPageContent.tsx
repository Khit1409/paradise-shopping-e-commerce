"use client";

import OrderPage from "../../../components/order/page/OrderPage";
import CreateNewProduct from "../../../components/seller/page/CreateProduct";
import CartPage from "../../../components/cart/page/CartPage";
import ShopPage from "../../../components/product/page/ShopPage";
import SalePage from "../../../components/product/page/SalePage";
import ProfileSetting from "../../../components/user/ProductSetting";
import CheckoutOrder from "../../../components/checkout/CheckoutOrder";
import EditProduct from "../../../components/seller/EditProduct";
import SellerManagerStoreProduct from "../../../components/seller/page/SellerManagerStoreProduct";

/**
 * render page follow url when navigation page
 * string => components
 */
const PAGE_CONTENT: Record<string, React.ReactNode> = {
  /**
   * user page contents
   */
  shop: <ShopPage />, //
  "my-cart": <CartPage />, //
  "my-order": <OrderPage />,
  sale: <SalePage />,
  profile: <ProfileSetting />,
  /**
   * seller page content
   */
  "manager-product-store": <SellerManagerStoreProduct            />,
  "edit-product": <EditProduct />,
  "add-new-product": <CreateNewProduct />,
  "checkout-my-order": <CheckoutOrder />,
};
/**
 *
 * @param param0
 * @returns
 */
export default function RenderPageContent({ content }: { content: string }) {
  return PAGE_CONTENT[content] ?? null;
}
