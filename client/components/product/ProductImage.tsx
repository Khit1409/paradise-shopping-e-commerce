import Image from "next/image";
import React, { useState } from "react";

type ComponentProps = {
  thumbnail: string;
  images: string[];
};

export default function ProductImage(props: ComponentProps) {
  /**
   * props
   */
  const { thumbnail, images } = props;
  /**
   * component state
   */
  const [imgPreview, setImgPreview] = useState<string>();
  return (
    <div className="flex gap-3 lg:flex-row flex-col justify-center items-center lg:items-start">
      {/* main img */}
      <Image
        src={imgPreview ?? thumbnail}
        alt="thumbnail image"
        width={400}
        objectFit="cover"
        height={450}
        className="border border-gray-200 h-[450px] flex-1 mt-1"
      />
      {/* img detail */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto overflow-y-hidden lg:overflow-y-auto lg:overflow-x-hidden px-2 py-1">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="thumbnail"
            width={100}
            height={100}
            onMouseEnter={() => setImgPreview(img)}
            className="border border-gray-200 hover:border-red-400 hover:scale-[1.05] transition-all duration-200 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
