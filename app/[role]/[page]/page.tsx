import { UserRole } from "@/type/auth.type";
import React from "react";
import RenderPage from "./RenderPage";
/**
 * params type
 */
type ParamTypes = {
  params: { role: UserRole; page: string };
};
/**
 *
 * @returns
 */
export default async function page({ params }: ParamTypes) {
  const { role, page } = await params;
  return <RenderPage page={page} role={role} />;
}
