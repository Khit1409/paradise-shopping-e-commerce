"use client";
import React from "react";
import TopBar from "./TopBar";
import NavbarDesktop from "../Navbar/NavbarDesktop";

export default function UserHeader() {
  return (
    <section className="shadow-md border-b border-gray-300">
      <TopBar />
      <NavbarDesktop />
    </section>
  );
}
