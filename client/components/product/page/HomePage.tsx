"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "../Pagination";
import { AppDispatch, RootState } from "../../../redux/store";
import ProductList from "../ProductList";
import { getProductThunk } from "../../../redux/product/thunk";

export default function HomePage() {
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
      <ProductList data={products} />
      {/* set page */}
      <Pagination setPage={setPage} page={page} />
    </section>
  );
}
