"use client";
import React from "react";
import TopBar from "./sections/TopBar";
import BannerSection from "../carousel/Banner";
import NavigationBarHomePage from "./sections/NavigationBarHome";

export default function Header() {
  return (
    <>
      <section className="shadow-md border">
        <TopBar />
        <NavigationBarHomePage />
      </section>
      <BannerSection />
    </>
  );
}
