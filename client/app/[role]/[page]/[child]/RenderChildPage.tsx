"use client";

import PageNotFound from "@/app/not-found";
import SingleProductPage from "@/components/product/page/SingleProductPage";
import CreateNewProductPage from "@/components/seller/page/CreateNewProductPage";
import EditProductPage from "@/components/seller/page/EditProductPage";
import ManagerOrder from "@/components/seller/page/ManagerOrder";
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
  /**
   * page of role user and child is single
   */
  user: {
    single: {
      product: <SingleProductPage />,
    },
  },
  /**
   * page of role seller and child is edit, add or manager
   */
  seller: {
    edit: {
      product: <EditProductPage />,
    },
    add: {
      product: <CreateNewProductPage />,
    },
    manager: {
      store: <SellerManagerStoreProduct />,
      order: <ManagerOrder />,
    },
  },
};
/**
 *
 * @returns
 */
export default function RenderChildPage({ child, page, role }: PropTypes) {
  return CHILD_PAGE[role][page][child] ?? <PageNotFound />;
}
