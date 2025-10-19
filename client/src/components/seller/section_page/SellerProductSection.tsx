"use client";
import { onErrorModel, onLoadingAction } from "@/api/Redux/Slice/App/app.slice";
import { AppDispatch, RootState } from "@/api/Redux/store";
import { getProductSellerThunk } from "@/api/Redux/Thunk/Product/product.thunk";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Component
 * @returns
 */
export default function SellerProductSection() {
  // root state redux && dispatch
  const { productSellerApi } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  //next router navigation
  const router = useRouter();
  //call api
  useEffect(() => {
    (async () => {
      try {
        //starting loading
        dispatch(onLoadingAction(true));
        // go to login page if not has user data
        if (!user) {
          return router.replace(`/login`);
        }
        // get product by seller id
        const rs = await dispatch(
          getProductSellerThunk({
            /**
             * note: change by filter method if have many request when change category
             */
            cate_slug: "",
          })
        );
        //  handle if successful call api
        if (getProductSellerThunk.fulfilled.match(rs)) {
          dispatch(onLoadingAction(false));
        } else {
          dispatch(onLoadingAction(false));
        }
        //exception error
      } catch (error) {
        dispatch(onLoadingAction(false));
        dispatch(onErrorModel({ mess: `${error}`, onError: true }));
      }
    })();
  }, [dispatch, user, router]);
  return (
    <section className="flex flex-col gap-2">
      {/* map products */}
      <div className="grid grid-cols-4 gap-3">
        {productSellerApi &&
          productSellerApi.map((pro) => (
            <div key={pro._id} className="flex flex-col gap-3">
              <Link
                // href single product page
                href={`/seller/update_single_product?product_id=${pro._id}`}
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
                </div>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}
