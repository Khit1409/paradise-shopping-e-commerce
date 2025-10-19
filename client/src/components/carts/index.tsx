"use client";

import CartSection from "./CartSection";
import ProductHomePage from "../Products/ProductHomePage";
import BorderLine from "../app_layout/BorderLine";
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
