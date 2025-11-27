import { OrderResponseType } from "@/type/order.interface";
import React from "react";

interface ComponentProps {
  orderIndex: number;
  order: OrderResponseType;
  showDetail: string;
  setShowDetail: React.Dispatch<React.SetStateAction<string>>;
}
/**
 * Seller order content row component
 * @param props
 * @returns
 */
export default function SellerOrderContentRow(props: ComponentProps) {
  const { orderIndex, order, showDetail, setShowDetail } = props;
  return (
    <div className="flex gap-3 text-gray-700">
      <div className="flex-1 text-center">{orderIndex + 1}</div>
      <div className="flex-1 text-center">{order.items.pay_type}</div>
      <div className="flex-1 text-center">{order.items.status}</div>
      <div className="flex-1 text-center">{order.items.shipping_type}</div>
      <div className="flex-1 text-center">{order.items.pay_state}</div>
      <div className="flex-1 text-center">{order.items.quantity}</div>
      <div className="flex-1 text-center">
        {order.items.total_price.toLocaleString("vi-VN")}
      </div>
      <div className="flex-1 text-center">
        {new Date(order.created_at).toLocaleDateString("vi-VN")}
      </div>
      <div className="flex-1 text-center">
        {showDetail === order.id ? (
          <button
            onClick={() => setShowDetail("")}
            type="button"
            className="text-red-500 text-sm hover:underline"
          >
            Đóng
          </button>
        ) : (
          <button
            onClick={() => setShowDetail(order.id)}
            type="button"
            className="text-blue-500 text-sm hover:underline"
          >
            Chi tiết
          </button>
        )}
      </div>
    </div>
  );
}
