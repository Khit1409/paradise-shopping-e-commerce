import React from "react";
import RenderRolePage from "./RendeRolePage";
import { UserRole } from "@/type/auth.type";
/**
 * role params
 */
type RoleParams = {
  params: {
    role: UserRole;
  };
};
/**
 *
 * @returns
 */
export default async function page({ params }: RoleParams) {
  const { role } = await params;
  return <RenderRolePage role={role} />;
}
