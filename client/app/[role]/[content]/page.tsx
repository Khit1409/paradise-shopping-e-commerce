import React from "react";
import RenderPageContent from "./RenderPageContent";

export default async function page({
  params,
}: {
  params: { role: "user" | "seller"; content: string };
}) {
  const { content } = await params;
  return <RenderPageContent content={content} />;
}
