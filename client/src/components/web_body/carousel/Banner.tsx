import Image from "next/image";
import React from "react";

export default function BannerSection() {
  return (
    <div className="w-full h-[300px] my-2">
      <Image
        src={"/imgs/food.jpg"}
        width={1260}
        height={300}
        className="w-full h-full"
        alt="banner"
        priority
      />
    </div>
  );
}
