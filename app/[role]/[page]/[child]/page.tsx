import { UserRole } from "@/type/auth.type";
import React from "react";
import RenderChildPage from "./RenderChildPage";
/**
 * params type
 */
type ParamTypes = {
  params: {
    role: UserRole;
    page: string;
    child: string;
  };
};
/**
 *
 * @returns
 */
export default async function page({ params }: ParamTypes) {
  const { role, page, child } = await params;
  return <RenderChildPage role={role} page={page} child={child} />;
}
