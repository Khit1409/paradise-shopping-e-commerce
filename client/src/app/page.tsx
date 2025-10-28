"use client";

import ProductHomePage from "@/components/product_page_section/pages/ProductHomePage";
import HomePageWrapper from "./HomePageWrapper";
import Header from "@/components/web_body/Header";
import CarouselHeader from "@/components/web_body/CarouselHeader";

export default function Home() {
  return (
    <HomePageWrapper>
      <Header />
      <CarouselHeader />
      <ProductHomePage />
    </HomePageWrapper>
  );
}
