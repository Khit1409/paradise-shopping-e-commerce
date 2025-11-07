import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getProductThunk } from "@/redux/product/thunk";
import { getProductSellerThunk } from "@/redux/seller/thunk";
import PriceBox from "./PriceBox";

type ComponentProps = {
  ofRole: "user" | "seller";
};
/**
 * func component
 * @param props
 * @returns
 */
export default function ProductList(props: ComponentProps) {
  const { ofRole } = props;
  const products = useSelector((state: RootState) =>
    ofRole === "user" ? state.product.products : state.seller.products
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    (async () => {
      if (ofRole) {
        if (ofRole === "user") await dispatch(getProductThunk({ page: 1 }));
        if (ofRole === "seller") await dispatch(getProductSellerThunk());
      }
    })();
  }, [ofRole, dispatch]);
  /**
   * prop state
   */

  /**
   * jsx
   */
  return (
    <div className="flex flex-col gap-3 my-2 bg-white p-2">
      <section className="flex flex-col gap-5">
        {products.length !== 0 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {products.map((pro) => (
              <Link
                href={`/${
                  ofRole === "seller"
                    ? `seller/edit-product?product_id=${pro._id}`
                    : `user/single-product?info=${pro._id}`
                }`}
                key={pro._id}
                className="border bg-white border-gray-300 hover:scale-[1.02] transition flex flex-col"
              >
                <Image
                  src={pro.thumbnail}
                  width={180}
                  height={200}
                  alt={pro.info.name}
                  className="object-cover w-full h-[200px]"
                />
                <div className="flex flex-col gap-1 p-2">
                  <p className="font-medium uppercase text-gray-700 hover:text-amber-600 hover:underline w-full truncate">
                    {pro.info.name}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <p className="text-gray-600">5.0</p>
                    {Array.from({ length: pro.rating }).map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} />
                    ))}
                  </div>
                  <PriceBox price={pro.original_price} sale={pro.sale} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <section className="flex items-center justify-center text-gray-700 h-[80vh]">
            <p>HIỆN SẢN PHẨM ĐANG TRỐNG....</p>
          </section>
        )}
      </section>
    </div>
  );
}
