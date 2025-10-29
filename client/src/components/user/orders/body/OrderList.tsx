import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillAlt, faTruck } from "@fortawesome/free-regular-svg-icons";
import React from "react";
import Image from "next/image";
import { faGift, faStore } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/api/redux/store";

export default function OrderList() {
  const { orders } = useSelector((state: RootState) => state.order);

  // format ngày dd/MM/yyyy
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  if (!orders || orders.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center text-gray-600">
        <p className="text-lg font-medium">Chưa có đơn hàng nào</p>
      </section>
    );
  }

  return orders ? (
    <section className="bg-gray-50 px-3 py-6 text-gray-700">
      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <div key={order.orderId} className="flex flex-col gap-2">
            {/* info */}
            <div className="flex flex-col gap-2">
              {/* store info */}
              <div className="flex items-center justify-between text-sm border border-gray-300 p-2 rounded">
                {/* shop info */}
                <div>
                  <Link href={"/store"} className="hover:underline">
                    <FontAwesomeIcon icon={faStore} /> Name of store
                  </Link>
                </div>
                {/* status order */}
                <div className="flex gap-2 text-sm">
                  <div className="border-r px-2">
                    <FontAwesomeIcon icon={faTruck} className="me-2" />
                    {(() => {
                      const status = order.orderItems.orderStatus;
                      if (status === "PENDING") return "Chờ xác nhận";
                      else if (status === "ACCEPTED") return "Đã xác nhận";
                      else if (status === "RECEIVED") return "Đã nhận hàng";
                      else if (status === "SHIPPING") return "Đang vận chuyển";
                      else if (status === "SHIPPINGFAILED")
                        return "Giao hàng thất bại";
                    })()}
                  </div>
                  {/* kind of ship */}
                  <div className="border-r px-2">
                    <FontAwesomeIcon icon={faTruck} className="me-2" />
                    {(() => {
                      const ship = order.orderItems.orderKindOfShipping;
                      if (ship === "COD") return "Vận chuyển thường";
                      else return "Vẫn chuyển nhanh";
                    })()}
                  </div>
                  {/* kind of pay */}
                  <div className="border-r px-2">
                    <FontAwesomeIcon icon={faGift} className="me-2" />
                    {(() => {
                      const pay = order.orderItems.orderKindOfPay;
                      if (pay === "COD") return "Thanh toán khi nhận hàng";
                      else if (pay === "ONLINE") return "Thanh toán online";
                    })()}
                  </div>
                  {/* pay status */}
                  <div className="px-2">
                    <FontAwesomeIcon icon={faMoneyBillAlt} className="me-2" />
                    {(() => {
                      const payStatus = order.orderItems.orderPayStatus;
                      if (payStatus === "PAID") return "Đã thanh toán";
                      else return "Chưa thanh toán";
                    })()}
                  </div>
                </div>
              </div>
              {/* order info */}
              <div className="flex justify-between items-center border rounded p-2 border-gray-300">
                {/* info and img */}
                <div className="p-2">
                  <div className="flex gap-2">
                    <Image
                      src={order.orderItems.orderImg}
                      alt=""
                      width={200}
                      height={100}
                    />
                    {/* order item */}
                    <div>
                      <Link
                        href={`/user/single_product?_info=_${order.orderItems.proId}`}
                        className="uppercase text-gray-800 hover:underline"
                      >
                        {order.orderItems.orderName}
                        {/* phân loại hàng */}
                      </Link>
                      <div>
                        {order.orderAttribute.map((attr, index) => (
                          <div key={index}>
                            <span>
                              {attr.attributeName}: {attr.attributeValue}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p>
                        <span className="text-sm">x</span>
                        {order.orderItems.orderQuantity}
                      </p>
                    </div>
                  </div>
                </div>
                {/* total price */}
                <div className="text-end">
                  <p>
                    {order.orderItems.orderTotalPrice.toLocaleString("vi-VN")}{" "}
                    <span className="text-gray-500 text-sm">VND</span>
                  </p>
                  <p>{formatDate(order.createdAt)}</p>
                </div>
              </div>
            </div>
            {/* action */}
            <div className="flex items-center justify-end border border-gray-300 rounded p-2">
              <div className="flex gap-5">
                <button className="border border-[orangered] p-1 hover:bg-orange-600">
                  MUA LẠI
                </button>
                <button className="border border-gray-300 p-1 hover:bg-gray-400">
                  CHAT VỚI NGƯỜI BÁN
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  ) : (
    <></>
  );
}
