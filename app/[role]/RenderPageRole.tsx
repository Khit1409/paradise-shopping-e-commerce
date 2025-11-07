import React from "react";
import Error from "../not-found";
import Home from "@/components/user/page/Home";
import Dashboard from "@/components/seller/page/Dashboard";
type Role = "user" | "seller";

const PAGE_ROLE: Record<Role, React.ReactNode> = {
  seller: <Dashboard />,
  user: <Home />,
};

export default function RenderPageRole({ role }: { role: Role }) {
  return PAGE_ROLE[role] || <Error />;
}
