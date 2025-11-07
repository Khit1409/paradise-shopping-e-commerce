"use client";
import { RootState } from "../../../redux/store";

import { useSelector } from "react-redux";

export default function LoadingAnimation() {
  const { onLoading } = useSelector((state: RootState) => state.app);
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
