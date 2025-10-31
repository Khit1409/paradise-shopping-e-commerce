import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div>
      <Image
        src={"/logo/paradise-shopping-logo.png"}
        alt=""
        height={120}
        width={50}
        className="w-[100px] h-[50px] object-cover"
      />
    </div>
  );
}
