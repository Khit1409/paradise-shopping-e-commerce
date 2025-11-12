"use client";
import { onLoadingAction } from "@/redux/app/slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

export default function LoadingAnimation() {
  const dispatch = useDispatch<AppDispatch>();
  /**
   * auto stop loading if server is not response api or some error handle.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(onLoadingAction(false));
    }, 10000);
    return () => clearTimeout(timer);
  }, [dispatch]);
  /**
   * redux state
   */
  const { onLoading } = useSelector((state: RootState) => state.app);
  //render
  return (
    onLoading && (
      <div className="w-screen h-screen fixed z-9999 bg-effect">
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin w-[100px] h-[100px] border-5 border-t-transparent rounded-full border-green-500" />
        </div>
      </div>
    )
  );
}
