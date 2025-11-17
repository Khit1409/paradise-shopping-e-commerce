"use client";

import { getOrderForSellerThunk } from "@/redux/seller/thunk";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SellerOrderList() {
  const { orders } = useSelector((state: RootState) => state.seller);
  const [showDetail, setShowDetail] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getOrderForSellerThunk());
  }, [dispatch]);
  /**
   * render
   */
  return (
    <div className="bg-white text-gray-700 p-4 flex flex-col gap-5">
      {/* filter order */}
      <section className="grid grid-cols-4 gap-3">
        {/* filter shipping type */}
        <div>
          <select
            name=""
            id="select_shipping_type"
            className="border border-gray-300 outline-0 p-1"
          >
            <option value="">Hình thức vận chuyển</option>
            <option value="COD">Đơn thường</option>
            <option value="FLASH">Đơn hỏa tốc</option>
          </select>
        </div>
        {/* filter order status */}
        <div>
          <select
            name=""
            id="select_order_status"
            className="border border-gray-300 outline-0 p-1"
          >
            <option value="">Trạng thái đơn hàng</option>
            <option value="PENDING">Chờ xác nhận</option>
            <option value="ACCEPTED">Đã xác nhận</option>
            <option value="RECEIVED">Đã nhận hàng</option>
            <option value="SHIPPING">Đang vận chuyển</option>
            <option value="SHIPPINGFAILED">Giao hàng thất bại</option>
          </select>
        </div>
        {/* filter order pay type */}
        <div>
          <select
            name=""
            className="border border-gray-300 p-1 outline-0"
            id="select_order_pay_type"
          >
            <option value="">Hình thức thanh toán</option>
            <option value="COD">Thanh toán khi nhận hàng</option>
            <option value="ONLINE">Thanh toán online</option>
          </select>
        </div>
        {/* filter order pay status */}
        <div>
          <select
            name=""
            className="border border-gray-300 p-1 outline-0"
            id="select_order_pay_status"
          >
            <option value="">Trạng thái thanh toán</option>
            <option value="PAID">Đã thanh toán</option>
            <option value="UNPAID">Chưa thanh toán</option>
          </select>
        </div>
        {/* filter date */}
        <div>
          <select name="" id="select_new_old_order_time" className="border border-gray-300 p-1 outline-0">
            <option value="">Ngày đặt hàng</option>
            <option value="OLD">Cũ nhất</option>
            <option value="NEW">Mới nhất</option>
          </select>
        </div>
      </section>
      {/* show */}
      <section className="flex flex-col gap-3">
        <div className="border-b py-1">
          <div className="flex gap-3 font-bold">
            <div className="flex-1 text-center">STT</div>
            <div className="flex-1 text-center">Loại đơn</div>
            <div className="flex-1 text-center">Trạng thái</div>
            <div className="flex-1 text-center">Vận chuyển</div>
            <div className="flex-1 text-center">Thanh toán</div>
            <div className="flex-1 text-center">Số lượng</div>
            <div className="flex-1 text-center">Tổng giá</div>
            <div className="flex-1 text-center">Ngày đặt</div>
            <div className="flex-1 text-center">Tùy chỉnh</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {orders.map((order, orderIndex) => (
            <div key={order.id} className="flex-col">
              <div className="flex gap-3">
                <div className="flex-1 text-center">{orderIndex + 1}</div>
                <div className="flex-1 text-center">{order.items.pay_type}</div>
                <div className="flex-1 text-center">{order.items.status}</div>
                <div className="flex-1 text-center">
                  {order.items.shipping_type}
                </div>
                <div className="flex-1 text-center">
                  {order.items.pay_state}
                </div>
                <div className="flex-1 text-center">{order.items.quantity}</div>
                <div className="flex-1 text-center">
                  {order.items.total_price.toLocaleString("vi-VN")} VND
                </div>
                <div className="flex-1 text-center">
                  {new Date(order.created_at).toLocaleString("vi-VN")}
                </div>
                <div className="flex-1 text-center">
                  {showDetail === order.id ? (
                    <button
                      onClick={() => {
                        setShowDetail("");
                      }}
                      type="button"
                      className="hover:underline text-red-500 text-sm"
                    >
                      Đóng
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowDetail(order.id);
                      }}
                      type="button"
                      className="hover:underline text-blue-500 text-sm"
                    >
                      Chi tiết
                    </button>
                  )}
                </div>
              </div>
              {showDetail === order.id ? (
                <div className="py-2 border-t border-b border-gray-300">
                  {/* Ảnh và thông tin đơn hàng */}
                  <div className="flex gap-2">
                    {/* ảnh */}
                    <Image
                      src={order.items.img}
                      alt=""
                      width={200}
                      height={200}
                    />
                    {/* thông tin */}
                    <div className="flex flex-col gap-1">
                      <strong className="uppercase text-sm text-wrap">
                        {order.items.name}
                      </strong>
                      <div className="flex gap-1">
                        <span>
                          {order.items.total_price.toLocaleString("vi-VN")}
                        </span>
                        x<span>{order.items.quantity}</span>
                      </div>
                      <div>
                        <strong>Trạng thái đơn hàng: </strong>{" "}
                        {(() => {
                          const status = order.items.status;
                          if (status === "PENDING") return "Chờ xác nhận";
                          else if (status === "ACCEPTED") return "Đã xác nhận";
                          else if (status === "RECEIVED") return "Đã nhận hàng";
                          else if (status === "SHIPPING")
                            return "Đang vận chuyển";
                          else if (status === "SHIPPINGFAILED")
                            return "Giao hàng thất bại";
                        })()}
                      </div>
                      <div>
                        <strong>Loại vận chuyển: </strong>
                        {(() => {
                          const ship = order.items.shipping_type;
                          if (ship === "COD") return "Vận chuyển thường";
                          else return "Vẫn chuyển nhanh";
                        })()}
                      </div>
                      <div>
                        <strong>Loại thanh toán: </strong>
                        {(() => {
                          const pay = order.items.pay_type;
                          if (pay === "COD") return "Thanh toán khi nhận hàng";
                          else if (pay === "ONLINE") return "Thanh toán online";
                        })()}
                      </div>
                      <div>
                        <strong>Ngày đặt: </strong>
                        {new Date(order.created_at).toLocaleString("vi-VN")}
                      </div>
                      <div className="flex gap-3">
                        <button className="text-sm p-1 border border-gray-300 hover:bg-green-500 hover:text-white">
                          XÁC NHẬN ĐƠN
                        </button>
                        <button className="text-sm p-1 border border-gray-300 hover:bg-red-500 hover:text-white">
                          HỦY ĐƠN
                        </button>
                        <button className="text-sm p-1 border border-gray-300 hover:bg-yellow-500 hover:text-white">
                          GIAO LẠI
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
