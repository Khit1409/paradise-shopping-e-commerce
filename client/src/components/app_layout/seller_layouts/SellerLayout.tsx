"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/api/Redux/store";
import { useRouter } from "next/navigation";
import SellerNavigationBar from "@/components/seller/seller_navigationbar/index";
import SellerHeader from "@/components/seller/header";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (user && user.userRole === "user") {
      return router.replace("/user");
    }
  }, [user, router]);
  return (
    <main className="w-full max-h-screen h-screen flex gap-1 overflow-hidden">
      <SellerNavigationBar />
      <div className="flex flex-col gap-1">
        <SellerHeader />
        <section className="border border-gray-300 h-[530px] overflow-y-auto p-2">
          {children}
        </section>
      </div>
    </main>
  );
}
