import React from "react";
import TopBar from "./TopBar";
import NavigationBar from "./NavigationBar";

export default function UserHeader() {
  return (
    <section className="shadow-md border-b border-gray-300">
      <TopBar />
      <NavigationBar />
    </section>
  );
}
