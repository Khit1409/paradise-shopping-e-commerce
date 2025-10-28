import React from "react";
import FooterTop from "./FooterTop";
import FooterMiddle from "./FooterMiddle";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <section className="bg-white p-2 text-gray-700">
      <FooterTop />
      <FooterMiddle />
      <FooterBottom />
    </section>
  );
}
