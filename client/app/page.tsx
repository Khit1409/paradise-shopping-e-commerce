"use client";

import HomePageWrapper from "./HomePageWrapper";

import HomePage from "../components/product/page/HomePage";
import UserHeader from "../components/layout/Header/Header";
import CarouselHeader from "../components/layout/Carousel/CarouselHeader";

export default function Home() {
  return (
    <HomePageWrapper>
      <UserHeader />
      <CarouselHeader />
      <HomePage />
    </HomePageWrapper>
  );
}
