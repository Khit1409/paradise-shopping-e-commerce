"use client";

import SellerProductSection from "./SellerManagerStoreProduct";
import StoreInformation from "./StoreInformation";

export default function SellerDashboard() {
  return (
    <div className="flex flex-col gap-2">
      <StoreInformation />
      <h4 className="text-[orangered] border-b border-[orangered]">
        SẢN PHẨM CỦA BẠN
      </h4>
      <SellerProductSection />
    </div>
  );
}
