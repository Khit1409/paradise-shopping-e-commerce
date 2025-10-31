import React from "react";
import Error from "../not-found";
import Home from "../../components/user/page/Home";
import Dashboard from "../../components/seller/page/Dashboard";

const PAGE_ROLE: Record<string, React.ReactNode> = {
  seller: <Dashboard />,
  user: <Home />,
};

export default function RenderPageRole({ role }: { role: string }) {
  return PAGE_ROLE[role] || <Error />;
}
