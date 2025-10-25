"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import NavigationProduct from "../page_parts/NavigationProduct";
import { onLoadingAction } from "@/api/redux/slice/app_slice/app.slice";
import { getHomeProductThunk } from "@/api/redux/thunk/product_thunk/product.thunk";
import { AppDispatch, RootState } from "@/api/redux/store";

export default function ProductHomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { productApi } = useSelector((state: RootState) => state.product);
  /**
   * State change product category
   */
  const [page, setPage] = useState<number>(1);
  /**
   * Call Api
   */
  useEffect(() => {
    (async () => {
      // start  loading
      dispatch(onLoadingAction(true));
      //call api
      const pr = await dispatch(
        getHomeProductThunk({
          page: page == 0 ? 1 : page,
        })
      );
      //check result
      if (getHomeProductThunk.fulfilled.match(pr)) {
        dispatch(onLoadingAction(false));
      } else {
        //stop loading if error
        dispatch(onLoadingAction(false));
      }
    })();
  }, [dispatch, page]);

  return (
    <section className="p-5">
      <div className="flex flex-col gap-3">
        <section className="flex flex-col gap-5">
          {productApi.length !== 0 ? (
            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {productApi.map((pro) => (
                <Link
                  href={`/user/single_product?_info=${pro.proSlug}_${pro._id}`}
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
                    <p className="text-xl font-bold text-amber-600">
                      {pro.proPrice.toLocaleString("vi-VN")}
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
          <div>
            <hr className="text-gray-300 border" />
          </div>
        </section>

        {/*  */}
      </div>
      {/* set page */}
      <NavigationProduct setPage={setPage} page={page} />
    </section>
  );
}
