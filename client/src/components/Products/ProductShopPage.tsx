"use client";

import { AppDispatch, RootState } from "@/api/Redux/store";
import {
  getHomeProductThunk,
  getProductShopThunk,
} from "@/api/Redux/Thunk/Product/product.thunk";

import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "./ProductFilter";
import { onLoadingAction } from "@/api/Redux/Slice/App/app.slice";

export default function ProductShopPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { productShop } = useSelector((state: RootState) => state.product);
  const searchParams = useSearchParams();
  const cateSlugQuery = searchParams.get("cate_slug");
  /**
   * App state
   */
  const [location, setLocation] = useState<string>("");
  const [costFilter, setCostFilter] = useState<{
    price?: number;
    sale?: number;
  }>({});
  const [cateSlug, setCateSlug] = useState(cateSlugQuery ?? "");
  /**
   * Query
   */
  const router = useRouter();
  /**
   * Call Api
   */
  useEffect(() => {
    (async () => {
      dispatch(onLoadingAction(true));
      const pr = await dispatch(
        getProductShopThunk({
          area: location ?? "",
          pro_price: costFilter?.price ?? "",
          pro_sale: costFilter.sale ?? "",
          cate_slug: cateSlug ?? "",
        })
      );
      if (getHomeProductThunk.fulfilled.match(pr)) {
        dispatch(onLoadingAction(false));
      } else {
        dispatch(onLoadingAction(false));
      }
    })();
  }, [dispatch, router, location, costFilter, cateSlugQuery, cateSlug]);

  return (
    <div className="h-screen">
      <div className="p-2 flex gap-2">
        <ProductFilter
          setCostFilter={setCostFilter}
          location={location}
          setCateSlug={setCateSlug}
          setLocation={setLocation}
        />
        <section className="flex flex-6 flex-col gap-2 bg-white p-2 h-screen overflow-y-auto">
          {productShop.length &&
            productShop.map((store) => (
              <section key={store.storeId} className="flex flex-col gap-5">
                {/* <div>
                  <div className="p-2 w-full border border-gray-300  flex justify-between">
                    <div className="text-gray-700">
                      <div className="flex flex-col gap-3">
                        <Link
                          href={`/user/store_single_page?id=${store._id}`}
                          className="hover:underline text-gray-700"
                        >
                          <FontAwesomeIcon icon={faStore} className="me-2" />
                          <span className="font-semibold">
                            {store.store_name}
                          </span>
                        </Link>
                        <div className="">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="text-red-500"
                          />
                          <FontAwesomeIcon icon={faStore} className="mx-1" />
                          {store.store_area}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 text-gray-700">
                      <Link
                        href={`mailto:${store.store_email}`}
                        className="text-sm italic hover:underline"
                      >
                        <FontAwesomeIcon className="me-2" icon={faEnvelope} />
                        {store.store_email}
                      </Link>
                      <Link
                        href={`tel:${store.store_phone}`}
                        className="text-sm italic hover:underline"
                      >
                        <FontAwesomeIcon className="me-2" icon={faPhone} />
                        {store.store_phone}
                      </Link>
                      <Link
                        href={`https://www.google.com/maps/search/?api=1&query=${store.store_address}`}
                        className="text-sm italic hover:underline"
                      >
                        <FontAwesomeIcon
                          className="me-2"
                          icon={faAddressCard}
                        />
                        {store.store_address}
                      </Link>
                    </div>
                    <div className="text-gray-700 flex flex-col gap-3">
                      <div className="flex gap-1">
                        <strong>Ngày tham gia:</strong>
                        <p>
                          {new Date(store.createdAt).toLocaleDateString(
                            "vi-VN",
                            {
                              timeZone: "Asia/Ho_Chi_Minh",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
                {store.products.length ? (
                  <section className="flex flex-col gap-5 ">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
                      {store.products.map((pro) => (
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
                            <p className="text-xs text-gray-500">
                              <FontAwesomeIcon
                                icon={faLocationDot}
                                className="text-sm text-red-500"
                              />
                              {store.storeArea.toUpperCase()}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                ) : (
                  <div>
                    <section
                      className="h-[400px] flex items-center justify-center p-4"
                      id="no_product"
                    >
                      <div>
                        <h3>KHO SẢN PHẨM TRỐNG</h3>
                      </div>
                    </section>
                  </div>
                )}
              </section>
            ))}
        </section>
      </div>
    </div>
  );
}
