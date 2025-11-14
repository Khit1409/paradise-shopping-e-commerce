import React from "react";
import SellerLoginPage from "@/components/seller/page/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập trang người bán",
  description: "Đăng nhập trang người bán",
  keywords: [
    "Trở thành người bán hàng Paradise shopping",
    "Seller Paradise shopping",
    "Paradise Shopping Seller Login",
  ],
};

export default function SellerLogin() {
  return <SellerLoginPage />;
}
