"use client";
import React from "react";

import ProductList from "@/components/product/ProductList";

/**
 * Component
 * @returns
 */
export default function SellerManagerStoreProduct() {
  //call api
  return (
    <section className="flex flex-col gap-2">
      {/* map products */}
      <ProductList ofRole="seller" />
    </section>
  );
}
