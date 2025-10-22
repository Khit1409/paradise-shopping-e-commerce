"use client";

import ProductContainer from "@/components/product_page_section/pages/ProductHomePage";
import HomePageWrapper from "./HomePageWrapper";
import Header from "@/components/web_body/header/index";

export default function Home() {
  return (
    <HomePageWrapper>
      <Header />
      <ProductContainer />
    </HomePageWrapper>
  );
}
