import React from "react";
import PageWrapper from "./PageWrapper";

export default async function layout({
  children,
  params,
}: {
  params: { role: "user" | "seller"; content: string };
  children: React.ReactNode;
}) {
  const { role } = await params;
  return <PageWrapper role={role}>{children}</PageWrapper>;
}
