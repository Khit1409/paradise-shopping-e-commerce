"use client";
import React from "react";
import CarouselSection from "./CarouselSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

/**
 * function component
 * @param param0
 * @returns
 */
export default function CarouselHeader() {
  /**
   * props state
   */
  const { carousel } = useSelector((state: RootState) => state.app);
  /**
   * render
   */
  return <CarouselSection data={carousel} />;
}
