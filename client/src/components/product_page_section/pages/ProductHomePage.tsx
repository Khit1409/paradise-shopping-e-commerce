"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavigationProduct from "../page_parts/NavigationProduct";
import { onLoadingAction } from "@/api/redux/slice/app_slice/app.slice";
import { getHomeProductThunk } from "@/api/redux/thunk/product_thunk/product.thunk";
import { AppDispatch, RootState } from "@/api/redux/store";
import ProductPreviewSection from "./ProductPreviewSection";

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
    <section className="p-5 bg-white my-1 shadow-md">
      <ProductPreviewSection data={productApi} />
      {/* set page */}
      <NavigationProduct setPage={setPage} page={page} />
    </section>
  );
}
