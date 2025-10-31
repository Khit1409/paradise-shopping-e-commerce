import { AppDispatch, RootState } from "../../redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLoadingAction } from "@/../redux/app/slice";
import { getProductThunk } from "../../redux/product/thunk";

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

  return { clearFilter, products, setCateSlug, setCostFilter, setLocation };
};
