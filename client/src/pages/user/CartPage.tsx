"use client";

import CartSection from "@/components/user/cart/CartSection";
import ProductHomePage from "@/components/products/ProductHome";
import BorderLine from "@/layouts/BorderLine";
/**
 *
 * @returns
 */
export default function CartPage() {
  return (
    <>
      <CartSection />
      <BorderLine title="SẢN PHẨM" />
      <ProductHomePage />
    </>
  );
}
