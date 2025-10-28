"use client";

import { AppDispatch, RootState } from "@/api/redux/store";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "./ProductFilter";
import { onLoadingAction } from "@/api/redux/slice/app_slice/app.slice";
import { getProductShopThunk } from "@/api/redux/thunk/product_thunk/product.thunk";
import ProductPreviewSection from "./ProductPreviewSection";
import CarouselHeader from "@/components/web_body/CarouselHeader";

export default function ProductShop() {
  const dispatch = useDispatch<AppDispatch>();
  const { productShop } = useSelector((state: RootState) => state.product);
  /**
   * App state
   */
  const [location, setLocation] = useState<string>("");

  const [costFilter, setCostFilter] = useState<{
    price?: {
      max_price?: number;
      min_price?: number;
    };
    sale?: { max_sale?: number; min_sale?: number };
  }>({});
  const [cateSlug, setCateSlug] = useState("");
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
          area: location,
          max_price: costFilter.price?.max_price,
          min_price: costFilter.price?.min_price,
          max_sale: costFilter.sale?.max_sale,
          min_sale: costFilter.sale?.min_sale,
          cate_slug: cateSlug,
        })
      );
      if (getProductShopThunk.fulfilled.match(pr)) {
        dispatch(onLoadingAction(false));
      } else {
        dispatch(onLoadingAction(false));
      }
    })();
  }, [dispatch, router, location, costFilter, cateSlug]);

  /**
   * stop and clear filter
   */
  const clearFilter = () => {
    setCateSlug("");
    setLocation("");
    setCostFilter({});
  };

  return (
    <section className="bg-white p-2 shadow-md my-1">
      <CarouselHeader />
      <div className="p-2 flex flex-col gap-2">
        <ProductFilter
          clear={clearFilter}
          setCostFilter={setCostFilter}
          setCateSlug={setCateSlug}
          setLocation={setLocation}
        />
        <ProductPreviewSection data={productShop} />
      </div>
    </section>
  );
}
