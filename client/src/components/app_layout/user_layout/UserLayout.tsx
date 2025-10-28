"use client";
import React from "react";
import UserHeader from "@/components/web_body/header/UserHeader";
import Footer from "@/components/web_body/footer";

/**
 * Component dùng  để duy trì trạng thái user
 * @param param0
 * @returns
 */
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {/* left */}
      <UserHeader />
      {/* <Banner /> */}
      {children}
      <Footer />
    </main>
  );
}
