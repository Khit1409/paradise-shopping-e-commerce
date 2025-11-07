import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLoadingAction } from "@/redux/app/slice";
import { getProductThunk } from "@/redux/product/thunk";

export const ShopHook = () => {
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

  return { clearFilter, products, setCateSlug, setCostFilter, setLocation };
};
