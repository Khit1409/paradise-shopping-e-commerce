import React from "react";
import TopBar from "./sections/TopBar";
import NavigationBar from "./sections/NavigationBar";

export default function UserHeader() {
  return (
    <>
      <section className="shadow-md">
        <TopBar />
        <NavigationBar />
      </section>
    </>
  );
}
