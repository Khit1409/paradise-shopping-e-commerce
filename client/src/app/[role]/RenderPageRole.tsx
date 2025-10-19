import React from "react";
import Error from "../not-found";
import UserHomePageLayout from "@/components/app_layout/user_layout/HomePageLayout";
import SellerDashboard from "@/components/seller/dashboard";

const PAGE_ROLE: Record<string, React.ReactNode> = {
  seller: <SellerDashboard />,
  user: <UserHomePageLayout />,
};

export default function RenderPageRole({ role }: { role: string }) {
  return PAGE_ROLE[role] || <Error />;
}
