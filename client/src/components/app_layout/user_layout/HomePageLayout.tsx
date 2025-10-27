"use client";
import { AppDispatch, RootState } from "@/api/redux/store";
import { getUserCartThunk } from "@/api/redux/thunk/cart_thunk/cart.thunk";
import ProductHomePage from "@/components/product_page_section/pages/ProductHomePage";
import CarouselHeader from "@/components/web_body/carousel/index";
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
      <CarouselHeader />
      <ProductHomePage />
    </>
  );
}
