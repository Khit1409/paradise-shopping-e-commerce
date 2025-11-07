"use client";

import CartList from "../CartList";
import BorderLine from "@/components/layout/BorderLine";
import Banner from "@/components/layout/Header/Banner";
import HomePage from "@/components/product/page/HomePage";
/**
 *
 * @returns
 */
export default function CartPage() {
  return (
    <>
      <Banner />
      <CartList />
      <BorderLine title="SẢN PHẨM" />
      <HomePage />
    </>
  );
}
