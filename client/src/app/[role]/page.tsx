import React from "react";
import RenderPageRole from "./RenderPageRole";

export default async function page({
  params,
}: {
  params: { role: "user" | "seller" };
}) {
  const { role } = await params;
  return <RenderPageRole role={role} />;
}
