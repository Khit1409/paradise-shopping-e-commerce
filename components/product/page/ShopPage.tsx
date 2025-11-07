import React from "react";
import { ShopHook } from "@/hook/product/ShopHook";
import ProductList from "../ProductList";
import ProductFilter from "../ProductFilter";
import Banner from "@/components/layout/Header/Banner";

export default function ShopPage() {
  const hook = ShopHook();
  const { clearFilter, setCateSlug, setCostFilter, setLocation } =
    hook;
  return (
    <>
      <Banner />
      <ProductFilter
        clear={clearFilter}
        setCateSlug={setCateSlug}
        setCostFilter={setCostFilter}
        setLocation={setLocation}
      />
      <ProductList ofRole="user" />
    </>
  );
}
