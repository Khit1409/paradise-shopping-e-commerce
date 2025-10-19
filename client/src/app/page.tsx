"use client";

import ProductContainer from "@/components/Products/ProductHomePage";
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
