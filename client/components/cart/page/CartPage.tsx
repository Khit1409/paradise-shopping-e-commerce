"use client";

import CartSection from "../CartList";
import BorderLine from "../../layout/BorderLine";
import Banner from "../../layout/Header/Banner";
import HomePage from "../../product/page/HomePage";
/**
 *
 * @returns
 */
export default function CartPage() {
  return (
    <>
      <Banner />
      <CartSection />
      <BorderLine title="SẢN PHẨM" />
      <HomePage />
    </>
  );
}
