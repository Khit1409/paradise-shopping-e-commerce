import React from "react";
import { ShopHook } from "../../../hook/product/ShopHook";
import ProductList from "../ProductList";
import ProductFilter from "../ProductFilter";
import Banner from "../../layout/Header/Banner";

export default function ShopPage() {
  const hook = ShopHook();
  const { clearFilter, setCateSlug, setCostFilter, setLocation, products } =
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
      <ProductList data={products} />
    </>
  );
}
