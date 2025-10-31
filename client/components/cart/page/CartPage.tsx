"use client";

import CartList from "../CartList";
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
      <CartList />
      <BorderLine title="SẢN PHẨM" />
      <HomePage />
    </>
  );
}
