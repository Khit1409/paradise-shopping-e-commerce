import { Products } from "@/api/interfaces/product.interface";
import { createSlug } from "@/feature/index";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
/**
 * Component props
 */
type ComponentProps = {
  related: Products[];
};
/**
 * Component function
 * @param param0
 * @returns
 */
export default function RealatedProduct({ ...props }: ComponentProps) {
  return (
    props.related && (
      <div>
        {props.related.length !== 0 && (
          <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
            {props.related.map((pro) => (
              <Link
                href={`/user/single_product?_info=${createSlug(pro.proName)}_${
                  pro._id
                }`}
                key={pro._id}
                className="border bg-white border-gray-300 hover:scale-[1.02] transition flex flex-col"
              >
                <Image
                  src={pro.proImg}
                  width={180}
                  height={200}
                  alt={pro.proName}
                  objectFit="cover"
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
                  <p className="text-xl font-bold text-amber-600">
                    {pro.proPrice.toLocaleString("vi-VN")}
                  </p>
                  <p className="text-xs text-gray-500">Giao hàng toàn quốc</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  );
}
