import { OrderResponseType } from "@/type/order.interface";
import Image from "next/image";
import React from "react";

interface ComponentProps {
  order: OrderResponseType;
}

export default function SellerOrderDetail(props: ComponentProps) {
  const { order } = props;
  return (
    <div className="py-2 border-t border-b border-gray-300 text-gray-700">
      <div className="flex gap-2">
        {/* ảnh */}
        <Image
          src={order.items.img}
          alt=""
          width={200}
          height={200}
          className="flex-1"
        />
        {/* thông tin */}
        <div className="flex-1 flex flex-col gap-1">
          <strong className="uppercase text-sm">{order.items.name}</strong>
          <div className="flex gap-1">
            <span>{order.items.total_price.toLocaleString("vi-VN")}</span>x
            <span>{order.items.quantity}</span>
          </div>
          <div>
            <strong>Trạng thái đơn hàng: </strong>
            {order.items.status === "PENDING"
              ? "Chờ xác nhận"
              : order.items.status === "ACCEPTED"
                ? "Đã xác nhận"
                : order.items.status === "RECEIVED"
                  ? "Đã nhận hàng"
                  : order.items.status === "SHIPPING"
                    ? "Đang vận chuyển"
                    : "Giao hàng thất bại"}
          </div>
          <div>
            <strong>Loại vận chuyển: </strong>
            {order.items.shipping_type === "COD"
              ? "Vận chuyển thường"
              : "Vận chuyển nhanh"}
          </div>
          <div>
            <strong>Loại thanh toán: </strong>
            {order.items.pay_type === "COD"
              ? "Thanh toán khi nhận hàng"
              : "Thanh toán online"}
          </div>
          <div>
            <strong>Ngày đặt: </strong>
            {new Date(order.created_at).toLocaleString("vi-VN")}
          </div>
          <div className="flex gap-3">
            <button className="text-sm p-1 border border-gray-300 text-gray-700 hover:bg-green-200">
              XÁC NHẬN ĐƠN
            </button>
            <button className="text-sm p-1 border border-gray-300 text-gray-700 hover:bg-red-200">
              HỦY ĐƠN
            </button>
            <button className="text-sm p-1 border border-gray-300 text-gray-700 hover:bg-yellow-200">
              GIAO LẠI
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1 ps-3 border-s">
          <strong className="uppercase text-sm">Chi tiết lựa chọn</strong>
          <div>
            <strong className="text-sm">Mẫu: </strong>
            {order.varitants.sku}
          </div>
          {order.varitants.attributes.map((varitant) => (
            <div key={varitant.name}>
              <strong>{varitant.name}: </strong> {varitant.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
