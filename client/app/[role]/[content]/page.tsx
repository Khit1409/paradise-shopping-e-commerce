import React from "react";
import RenderPageContent from "./RenderPageContent";

type Role = "user" | "seller";

export default async function page({
  params,
}: {
  params: { role: Role; content: string };
}) {
  const { content, role } = await params;
  return <RenderPageContent role={role} content={content} />;
}
