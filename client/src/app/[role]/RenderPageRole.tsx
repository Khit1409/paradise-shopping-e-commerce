import React from "react";
import Error from "../not-found";
import SellerDashboard from "@/components/seller/SellerDashboard";
import UserHomePage from "@/pages/user/HomePage";

const PAGE_ROLE: Record<string, React.ReactNode> = {
  seller: <SellerDashboard />,
  user: <UserHomePage />,
};

export default function RenderPageRole({ role }: { role: string }) {
  return PAGE_ROLE[role] || <Error />;
}
