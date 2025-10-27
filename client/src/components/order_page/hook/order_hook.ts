"use client";

import { AppDispatch, RootState } from "@/api/redux/store";
import { useDispatch, useSelector } from "react-redux";

export const UserOrderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useSelector((state: RootState) => state.order);
  console.log(orders)
  /**
   * get api when component start mount
   */
  return { orders };
};
