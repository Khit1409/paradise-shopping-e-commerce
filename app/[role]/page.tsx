import React from "react";
import RenderPageRole from "./RenderPageRole";
type Role = "user" | "seller";

export default async function page({ params }: { params: { role: Role } }) {
  const { role } = await params;
  return <RenderPageRole role={role} />;
}
