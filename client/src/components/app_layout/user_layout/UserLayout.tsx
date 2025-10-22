"use client";
import React from "react";
import NavigationBar from "../../web_body/header/sections/NavigationBar";
import TopBar from "@/components/web_body/header/sections/TopBar";

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
      <TopBar />
      <NavigationBar />
      {/* <Banner /> */}
      {children}
    </main>
  );
}
