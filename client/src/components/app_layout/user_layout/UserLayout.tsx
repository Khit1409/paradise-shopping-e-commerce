"use client";
import React from "react";
import TopBar from "../../web_body/Header/TopBar";
import NavigationBar from "../../web_body/header/sections/NavigationBar";

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
      <TopBar />
      <NavigationBar />
      {/* <Banner /> */}
      {children}
    </main>
  );
}
