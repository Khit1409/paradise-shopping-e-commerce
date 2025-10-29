"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavigationProduct from "./NavigationProduct";
import { getProductThunk } from "@/api/redux/thunk/product_thunk/product.thunk";
import { AppDispatch, RootState } from "@/api/redux/store";
import ProductPreviewSection from "./ProductPreviewSection";

export default function ProductHomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);
  /**
   * State change product category
   */
  const [page, setPage] = useState<number>(1);
  /**
   * Call Api
   */
  useEffect(() => {
    (async () => {
      //call api
      await dispatch(
        getProductThunk({
          page: page == 0 ? 1 : page,
        })
      );
    })();
  }, [dispatch, page]);

  return (
    <section className="p-5 bg-white shadow-md">
      <ProductPreviewSection data={products} />
      {/* set page */}
      <NavigationProduct setPage={setPage} page={page} />
    </section>
  );
}
