"use client";

import { AppDispatch, RootState } from "@/api/redux/store";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "./ProductFilter";
import { onLoadingAction } from "@/api/redux/slice/app_slice/app.slice";
import { getProductThunk } from "@/api/redux/thunk/product_thunk/product.thunk";
import ProductPreviewSection from "./ProductPreviewSection";
import CarouselHeader from "@/components/web_body/CarouselHeader";

export default function ProductShop() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);
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
        getProductThunk({
          area: location,
          maxPrice: costFilter.price?.max_price,
          minPrice: costFilter.price?.min_price,
          maxSale: costFilter.sale?.max_sale,
          minSale: costFilter.sale?.min_sale,
          category: cateSlug,
          page: 1,
        })
      );
      if (getProductThunk.fulfilled.match(pr)) {
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
        <ProductPreviewSection data={products} />
      </div>
    </section>
  );
}
