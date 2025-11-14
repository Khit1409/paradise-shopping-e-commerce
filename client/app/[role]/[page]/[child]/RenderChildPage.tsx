"use client";

import SingleProductPage from "@/components/product/page/SingleProductPage";
import CreateNewProductPage from "@/components/seller/page/CreateNewProductPage";
import EditProductPage from "@/components/seller/page/EditProductPage";
import SellerManagerStoreProduct from "@/components/seller/page/SellerManagerStoreProduct";
import { UserRole } from "@/type/auth.type";
import React from "react";
/**
 * props type
 */
type PropTypes = {
  role: UserRole;
  page: string;
  child: string;
};
/**
 * record page child
 */
const CHILD_PAGE: Record<
  UserRole,
  Record<string, Record<string, React.ReactNode>>
> = {
  user: {
    single: {
      product: <SingleProductPage />,
    },
  },
  seller: {
    edit: {
      product: <EditProductPage />,
    },
    add: {
      product: <CreateNewProductPage />,
    },
    manager: {
      store: <SellerManagerStoreProduct />,
    },
  },
};
/**
 *
 * @returns
 */
export default function RenderChildPage({ child, page, role }: PropTypes) {
  return CHILD_PAGE[role][page][child];
}
