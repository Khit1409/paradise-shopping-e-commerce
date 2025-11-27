import { GetOrderForSellerQuery } from "@/type/seller.interface";
import React from "react";

interface ComponentProps {
  setFilterValue: React.Dispatch<React.SetStateAction<GetOrderForSellerQuery>>;
  filterValue: GetOrderForSellerQuery;
}

export default function SellerFilterOrder(props: ComponentProps) {
  const { setFilterValue, filterValue } = props;
  return (
    <section className="grid grid-cols-4 gap-3">
      {/* filter shipping type */}
      <div>
        <select
          onChange={(e) => {
            setFilterValue((prev) => ({
              ...prev,
              ship_type: e.target.value as "COD" | "FLASH",
            }));
          }}
          name="select_shipping_type"
          value={filterValue.ship_type}
          id="select_shipping_type"
          className="border border-gray-300 p-1 w-full text-gray-700"
        >
          <option value="">Hình thức vận chuyển</option>
          <option value="COD">Đơn thường</option>
          <option value="FLASH">Đơn hỏa tốc</option>
        </select>
      </div>
      {/* filter order status */}
      <div>
        <select
          onChange={(e) => {
            setFilterValue((prev) => ({
              ...prev,
              status: e.target.value,
            }));
          }}
          name="select_order_status"
          value={filterValue.status}
          id="select_order_status"
          className="border border-gray-300 p-1 w-full text-gray-700"
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
          onChange={(e) => {
            setFilterValue((prev) => ({
              ...prev,
              pay_type: e.target.value,
            }));
          }}
          name="select_order_pay_type"
          value={filterValue.pay_type}
          className="border border-gray-300 p-1 w-full text-gray-700"
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
          onChange={(e) => {
            setFilterValue((prev) => ({
              ...prev,
              pay_state: e.target.value,
            }));
          }}
          name="select_order_pay_status"
          value={filterValue.pay_state}
          className="border border-gray-300 p-1 w-full text-gray-700"
          id="select_order_pay_status"
        >
          <option value="">Trạng thái thanh toán</option>
          <option value="PAID">Đã thanh toán</option>
          <option value="UNPAID">Chưa thanh toán</option>
        </select>
      </div>
      {/* sort*/}
      <div>
        <select
          name="select_sort"
          value={filterValue.sort}
          id="select_sort"
          onChange={(e) => {
            setFilterValue((prev) => ({
              ...prev,
              sort: e.target.value,
            }));
          }}
          className="border border-gray-300 p-1 w-full text-gray-700"
        >
          <option value="">Sắp xếp theo</option>
          <option value="date">Ngày đặt hàng</option>
          <option value="price">Giá đơn hàng</option>
        </select>
      </div>
    </section>
  );
}
