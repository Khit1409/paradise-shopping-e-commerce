"use client";
import { AppDispatch, RootState } from "@/api/Redux/store";
import { getUserCartThunk } from "@/api/Redux/Thunk/Product/product.thunk";
import ProductHomePage from "@/components/Products/ProductHomePage";
import BannerSection from "@/components/web_body/Carousel/Banner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserHomePageLayout() {
  /**
   * redux state
   */
  const { user } = useSelector((state: RootState) => state.auth);
  //dispatch
  const dispatch = useDispatch<AppDispatch>();
  /**
   * Get cart lenght
   */
  useEffect(() => {
    if (user) {
      (async () => {
        await dispatch(getUserCartThunk());
      })();
    }
  }, [dispatch, user]);

  //render
  return (
    <>
      <BannerSection />
      <ProductHomePage />
    </>
  );
}
