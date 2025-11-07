"use client";

import { usePathname } from "next/navigation";

export default function Banner() {
  const pathName = usePathname();
  const path = pathName?.split("/")[2].split("-").join(" ");
  return (
    <div className="h-[300px] bg-[url(/imgs/carousel/banner.jpg)] bg-center bg-cover bg-no-repeat">
      <div className="flex items-center justify-center h-full">
        <p className="text-4xl font-bold uppercase text-shadow-lg text-gray-800 text-shadow-white">
          {path}
        </p>
      </div>
    </div>
  );
}
