"use client";

import { CarouselApiDataType } from "@/type/app.interface";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Component props
 */
type ComponentProps = {
  data: CarouselApiDataType[];
};
/**
 * function component
 * @returns
 */
export default function CarouselSection(props: ComponentProps) {
  /**
   * props
   */
  const { data } = props;
  const carouseSize = data.length;
  /**
   * component state
   */
  const [indexImg, setIndexImg] = useState<number>(0);
  /**
   * handle
   */
  const nextImg = () => {
    setIndexImg((prev) => (prev === carouseSize - 1 ? 0 : prev + 1));
  };
  const prevImg = () => {
    setIndexImg((prev) => (prev === 0 ? carouseSize - 1 : prev - 1));
  };
  /**
   * auto change slide
   */
  useEffect(() => {
    const timer = setInterval(() => {
      nextImg();
    }, 3000);
    return () => clearInterval(timer);
  });

  return (
    data && (
      <section className="w-full p-1 bg-white shadow-md">
        {/* banner */}
        <div className="flex justify-center items-center overflow-hidden flex-col gap-2 relative">
          {/* duration 7s transtion - transform - translate X */}
          <div
            className="flex transition-transform duration-700 ease-in-out w-full"
            style={{
              transform: `translateX(-${indexImg * 100}%)`,
              inlineSize: `100%`,
            }}
          >
            {data.map((imgs) => (
              <Image
                src={imgs.imgUrl}
                width={1280}
                height={400}
                key={imgs._id}
                alt={imgs.title}
                className="object-cover h-[450px] w-full shrink-0 border"
              />
            ))}
          </div>
          <div className="absolute bottom-0 p-2 text-white w-[90%] flex gap-2 items-center justify-end ">
            <button
              onClick={() => prevImg()}
              className="w-[40px] h-[40px] rounded-full bg-[orange]"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              onClick={() => nextImg()}
              className="w-[40px] h-[40px] rounded-full bg-[orange]"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
        {/* nav ball */}
        <div className="flex gap-2 items-center justify-center p-2">
          {data.map((nav, index) => (
            <button
              key={nav._id}
              onClick={() => setIndexImg(index)}
              className={`w-[10px] h-[10px] rounded-full border border-gray-300 ${
                indexImg == index ? "bg-gray-500" : "bg-white"
              }`}
            />
          ))}
        </div>
      </section>
    )
  );
}
