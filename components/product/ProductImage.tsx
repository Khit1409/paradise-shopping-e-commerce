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
    <div className="flex gap-3 w-1/2">
      {/* main img */}
      <Image
        src={imgPreview ?? thumbnail}
        alt="thumbnail image"
        width={400}
        objectFit="cover"
        height={300}
        className="border border-gray-200 h-[400px] flex-1"
      />
      {/* img detail */}
      <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden p-2">
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
