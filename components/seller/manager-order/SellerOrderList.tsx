"use client";

import { onLoadingAction } from "@/redux/app/slice";
import { getOrderForSellerThunk } from "@/redux/seller/thunk";
import { AppDispatch, RootState } from "@/redux/store";
import { GetOrderForSellerQuery } from "@/type/seller.interface";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SellerOrderDetail from "./SellerOrderDetail";
import SellerOrderContentRow from "./SellerOrderContentRow";
import SellerFilterOrder from "./SellerFilterOrder";

export default function SellerOrderList() {
  const { orders } = useSelector((state: RootState) => state.seller);
  const [showDetail, setShowDetail] = useState<string>("");
  const [filterValue, setFilterValue] = useState<GetOrderForSellerQuery>({
    pay_state: "",
    status: "",
    pay_type: "",
    ship_type: "",
    sort: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (orders.length == 0) {
      const timer = setTimeout(() => {
        dispatch(onLoadingAction(true));
      }, 2000);
      return () => {
        clearTimeout(timer);
        dispatch(onLoadingAction(false));
      };
    }
  }, [dispatch, orders]);

  useEffect(() => {
    dispatch(getOrderForSellerThunk(filterValue));
  }, [dispatch, filterValue]);

  return (
    <div className="bg-white text-gray-700 p-4 flex flex-col gap-5">
      {/* filter order */}
      <SellerFilterOrder
        setFilterValue={setFilterValue}
        filterValue={filterValue}
      />
      <div>
        <button
          onClick={() => {
            setFilterValue({
              pay_state: "",
              status: "",
              pay_type: "",
              ship_type: "",
              sort: "",
            });
          }}
          className="border border-gray-300 px-2 py-1 text-gray-700 hover:bg-gray-200"
        >
          Hủy lọc
        </button>
      </div>
      {/* show orders */}
      <section className="flex flex-col gap-3">
        <div className="border-b py-1">
          <div className="flex gap-3 font-bold text-gray-700">
            <div className="flex-1 text-center">STT</div>
            <div className="flex-1 text-center">Loại đơn</div>
            <div className="flex-1 text-center">Trạng thái</div>
            <div className="flex-1 text-center">Vận chuyển</div>
            <div className="flex-1 text-center">Thanh toán</div>
            <div className="flex-1 text-center">Số lượng</div>
            <div className="flex-1 text-center">Tổng giá {"(VND)"}</div>
            <div className="flex-1 text-center">Ngày đặt</div>
            <div className="flex-1 text-center">Tùy chỉnh</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {orders.map((order, orderIndex) => (
            <div key={order.id} className="flex-col">
              {/* Seller order content row */}
              <SellerOrderContentRow
                orderIndex={orderIndex}
                order={order}
                showDetail={showDetail}
                setShowDetail={setShowDetail}
              />
              {/* preview order detail */}
              {showDetail === order.id &&
                (() => {
                  const selectedOrder = orders.find(
                    (order) => order.id === showDetail
                  );
                  if (!selectedOrder) return null;
                  return <SellerOrderDetail order={selectedOrder} />;
                })()}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
