"use client";
import Dashboard from "@/components/seller/page/Dashboard";
import Home from "@/components/user/page/Home";
import { UserRole } from "@/type/auth.type";
import React from "react";
/**
 * type of params
 */
type PropTypes = {
  role: UserRole;
};
/**
 * dyamic render
 */
const ROLE_PAGE: Record<UserRole, React.ReactNode> = {
  user: <Home />,
  seller: <Dashboard />,
};
/**
 *
 * @returns
 */
export default function RenderRolePage({ role }: PropTypes) {
  return ROLE_PAGE[role];
}
