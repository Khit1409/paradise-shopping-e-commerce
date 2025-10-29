"use client";

import HomePageWrapper from "./HomePageWrapper";
import Header from "@/components/web_body/Header";
import CarouselHeader from "@/components/web_body/CarouselHeader";
import ProductHomePage from "@/components/products/ProductHome";

export default function Home() {
  return (
    <HomePageWrapper>
      <Header />
      <CarouselHeader />
      <ProductHomePage />
    </HomePageWrapper>
  );
}
