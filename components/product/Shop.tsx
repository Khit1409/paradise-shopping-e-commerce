import { onLoadingAction } from "@/redux/app/slice";
import { getProductThunk } from "@/redux/product/thunk";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Banner from "../layout/Header/Banner";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";

export default function Shop() {
  const dispatch = useDispatch<AppDispatch>();
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
          brand: "",
          location,
          max_price: costFilter.price?.max_price,
          min_price: costFilter.price?.min_price,
          max_sale: costFilter.sale?.max_sale,
          min_sale: costFilter.sale?.min_sale,
          category: cateSlug,
          page: 1,
        })
      );
      if (getProductThunk.fulfilled.match(pr)) {
        return dispatch(onLoadingAction(false));
      } else {
        return dispatch(onLoadingAction(false));
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
    <>
      <Banner />
      <ProductFilter
        clear={clearFilter}
        setCateSlug={setCateSlug}
        setCostFilter={setCostFilter}
        setLocation={setLocation}
      />
      <ProductList ofRole="user" />
    </>
  );
}
