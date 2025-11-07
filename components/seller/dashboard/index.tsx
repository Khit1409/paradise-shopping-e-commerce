"use client";

import ProductList from "../../product/ProductList";

export default function SellerDashboard() {
  return (
    <div>
      <ProductList ofRole={"seller"} />
    </div>
  );
}
