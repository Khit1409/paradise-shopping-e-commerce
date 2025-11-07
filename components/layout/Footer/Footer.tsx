import React from "react";
import FooterTop from "./FooterTop";
import FooterMiddle from "./FooterMiddle";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <section className="bg-white border-t border-gray-300 text-gray-700">
      <FooterTop />
      <FooterMiddle />
      <FooterBottom />
    </section>
  );
}
