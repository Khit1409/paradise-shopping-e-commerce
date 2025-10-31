import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Products } from "@/api/interfaces/product.interface";

type ComponentProps = {
  data: Products[];
};
/**
 * func component
 * @param props
 * @returns
 */
export default function ProductList(props: ComponentProps) {
  /**
   * prop state
   */
  const { data } = props;
  /**
   * jsx
   */
  return (
    <div className="flex flex-col gap-3 my-2 bg-white p-2">
      <section className="flex flex-col gap-5">
        {data.length !== 0 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {data.map((pro) => (
              <Link
                href={`/user/single-product?_info=${pro.proSlug}_${pro._id}`}
                key={pro._id}
                className="border bg-white border-gray-300 hover:scale-[1.02] transition flex flex-col"
              >
                <Image
                  src={pro.proImg}
                  width={180}
                  height={200}
                  alt={pro.proName}
                  className="object-cover w-full h-[200px]"
                />
                <div className="flex flex-col gap-1 p-2">
                  <p className="font-medium text-gray-700 hover:text-amber-600 hover:underline line-clamp-2">
                    {pro.proName}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <p className="text-gray-600">5.0</p>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} />
                    ))}
                  </div>
                  <p className="font-semibold text-amber-600">
                    {pro.proPrice.toLocaleString("vi-VN")} VND
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <section className="h-[300px] flex items-center justify-center text-gray-7000">
            <p>HIỆN SẢN PHẨM ĐANG TRỐNG....</p>
          </section>
        )}
      </section>
    </div>
  );
}
