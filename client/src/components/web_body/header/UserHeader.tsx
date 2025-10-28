import React from "react";
import TopBar from "./sections/TopBar";
import NavigationBar from "./sections/NavigationBar";

export default function UserHeader() {
  return (
    <section className="shadow-md border-b border-gray-300">
      <TopBar />
      <NavigationBar />
    </section>
  );
}
