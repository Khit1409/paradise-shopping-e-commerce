"use client";

import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/api/Redux/Slice/App/app.slice";
import { AppDispatch, RootState } from "@/api/Redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { payMethod, shippingMethod } from "./feature/order_form";
import { getIconByName } from "@/ultis/ultis";
import { useEffect, useState } from "react";
import { getAddressThunk } from "@/api/Redux/Thunk/App/app.thunk";
import SelectAddressForm from "@/components/Form/SelectAddressForm";
import { addNewOrder } from "@/api/services/order.service";
import {
  checkoutAction,
  onOpenOrderModal,
} from "@/api/Redux/Slice/Order/order.slice";

export default function OrderModal() {
  /** Redux setup */
  const dispatch = useDispatch<AppDispatch>();
  const { orderState } = useSelector((state: RootState) => state.order);
  const { user } = useSelector((state: RootState) => state.auth);

  /** Local state */
  const [kindOfShip, setKindOfShip] = useState<"COD" | "FLASH">("COD");
  const [kindOfPay, setKindOfPay] = useState<"ONLINE" | "COD">("COD");
  const [orderAddress, setOrderAddress] = useState<string>("");
  const [orderEmail, setOrderEmail] = useState<string>("");
  const [orderPhone, setOrderPhone] = useState<string>("");
  const [otherEmail, setOtherEmail] = useState<string>("");
  const [otherPhone, setOtherPhone] = useState<string>("");
  /**
   * Props state
   */
  const [otherAddress, setOtherAddress] = useState<string>("");

  /** Fetch address data when modal open */
  useEffect(() => {
    if (!orderState) {
      return;
    }
    if (orderState.open) dispatch(getAddressThunk());
  }, [dispatch, orderState]);

  /** Reset all local states when component unmount */
  useEffect(() => {
    return () => {
      setOrderAddress("");
      setKindOfPay("COD");
      setKindOfShip("COD");
      setOtherAddress("");
    };
  }, []);

  /** Close modal handler */
  const closeModal = () =>
    dispatch(
      onOpenOrderModal({
        open: false,
        items: null,
      })
    );

  /** Handle address select */
  const onchangeAddress = (address: string) => {
    setOrderAddress((prev) => (prev === address ? "" : address));
  };

  /**
   * handle add to order
   */
  async function addToOrder() {
    try {
      if (!user || !orderState || !orderState.items) {
        return;
      }
      dispatch(onLoadingAction(true));
      const result = await addNewOrder({
        contact: {
          address: orderAddress === "other" ? otherAddress : orderAddress,
          email: orderEmail === "other" ? otherEmail : orderEmail,
          phone: orderPhone === "other" ? otherPhone : orderPhone,
          userName: `${user.userFirtName}-${user.userLastName}`,
        },
        item: {
          proId: orderState.items.productId,
          kindOfShip,
          kindOfPay,
          orderName: orderState.items.productId,
          orderStatus: "PENDING",
          payStatus: "PAID",
          quantity: orderState.items.quantity,
          totalPrice: orderState.items.totalPrice,
        },
      });
      if (result.resultCode === 1) {
        if (result.payment !== null) {
          dispatch(checkoutAction({ openModal: true, value: result.payment }));
        }

        dispatch(onLoadingAction(false));
        dispatch(onSuccessfulModel(true));

        return;
      } else {
        dispatch(onLoadingAction(false));
        dispatch(onErrorModel({ mess: "Đơn hàng thất bại!", onError: true }));
      }
    } catch (error) {
      dispatch(onLoadingAction(false));
      dispatch(onErrorModel({ onError: true, mess: `${error}` }));
      return;
    }
  }

  /** Prevent render if modal is closed */
  if (!orderState || !orderState.open) return null;

  return (
    user &&
    orderState &&
    orderState.items && (
      <section
        className="fixed inset-0 text-gray-700 z-[999] flex items-center justify-center bg-black/60"
        onClick={closeModal}
      >
        <div
          className="bg-white rounded-md shadow-xl p-6 w-[95%] sm:w-[600px] max-h-[90vh] overflow-y-auto animate-fade-in border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b-2 border-gray-200 pb-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-700">
              Chi tiết đơn hàng
            </h2>
            <button
              onClick={closeModal}
              className="text-red-500 text-2xl hover:text-red-700 transition"
            >
              ×
            </button>
          </div>

          {/* Product info */}
          <div className="flex flex-col items-center mb-5">
            {orderState.items.productImg && (
              <Image
                width={120}
                height={120}
                src={orderState.items.productImg}
                alt="product"
                className="w-32 h-32 object-cover mb-3"
              />
            )}
            <p className="text-gray-700">
              <span className="font-semibold">Số lượng:</span>{" "}
              {orderState.items.quantity}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Tổng giá:</span>{" "}
              <span className="text-green-600 font-semibold">
                {orderState.items.totalPrice?.toLocaleString("vi-VN")} ₫
              </span>
            </p>
          </div>

          {/* Attribute section */}
          <div className="border-t border-gray-200 pt-3 mb-3">
            <h3 className="text-gray-700 font-semibold mb-2">Phân loại hàng</h3>
            {orderState.items.attribute?.length ? (
              <ul className="grid grid-cols-3 gap-2">
                {orderState.items.attribute.map((attr, idx) => (
                  <li
                    key={idx}
                    className="text-gray-700 flex flex-col gap-2 items-center text-center border border-gray-300 p-2"
                  >
                    <span className="font-semibold">{attr.attrName}</span>
                    {attr.itemImg && (
                      <Image
                        src={attr.itemImg}
                        alt=""
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    )}
                    {attr.itemValue}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Không có thuộc tính.</p>
            )}
          </div>

          {/* Shipping method */}
          <div className="py-3 border-t border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">
              Hình thức vận chuyển
            </h3>
            <div className="flex flex-wrap gap-3">
              {shippingMethod.map((s) => (
                <button
                  onClick={() => setKindOfShip(s.value)}
                  key={s.id}
                  value={s.value}
                  className={`p-3 border text-gray-700 flex items-center gap-2 ${
                    s.value === kindOfShip
                      ? "border-green-600 bg-green-100"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <FontAwesomeIcon icon={getIconByName(s.icon)} />
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Payment method */}
          <div className="py-3 border-t border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">
              Hình thức thanh toán
            </h3>
            <div className="flex flex-wrap gap-3">
              {payMethod.map((pay) => (
                <button
                  onClick={() => setKindOfPay(pay.value)}
                  key={pay.id}
                  className={`p-3 border text-gray-700 flex items-center gap-2 ${
                    pay.value === kindOfPay
                      ? "border-green-600 bg-green-100"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <FontAwesomeIcon icon={getIconByName(pay.icon)} />
                  {pay.name}
                </button>
              ))}
            </div>
          </div>

          {/* Address section */}
          <div className="py-3 border-t border-gray-200 flex flex-col gap-3">
            <h3 className="font-semibold text-gray-700 mb-1">
              Địa chỉ nhận hàng
            </h3>
            <div className="flex flex-col gap-2">
              {user?.userAddress?.length ? (
                user.userAddress.map((address) => (
                  <label key={address._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={orderAddress === address.addressName}
                      value={address.addressName}
                      onChange={(e) => onchangeAddress(e.target.value)}
                    />
                    <span>{address.addressName}</span>
                  </label>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Chưa có địa chỉ nào</p>
              )}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={orderAddress === "other"}
                  value="other"
                  onChange={(e) => onchangeAddress(e.target.value)}
                />
                <span>Khác</span>
              </label>
            </div>

            {/* Nếu chọn khác thì hiện form */}
            {orderAddress === "other" && (
              <SelectAddressForm getValue={setOtherAddress} />
            )}
          </div>

          {/* email section */}
          <div className="py-3 border-t border-gray-300 flex flex-col gap-3">
            <h3 className="font-semibold">Email nhận hàng</h3>
            {orderEmail}
            <div className="flex flex-col gap-2">
              {user.userOtherEmail.map((email) => (
                <div className="flex items-center gap-2" key={email._id}>
                  <input
                    type="checkbox"
                    id={email._id}
                    checked={email.emailAddress === orderEmail}
                    value={email.emailAddress}
                    onChange={(e) => {
                      setOrderEmail(
                        e.target.value === orderEmail ? "" : e.target.value
                      );
                    }}
                  />
                  <label htmlFor={email._id}>{email.emailAddress}</label>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={"otherEmail"}
                  onChange={() =>
                    setOrderEmail(orderEmail === "other" ? "" : "other")
                  }
                  checked={orderEmail === "other"}
                />
                <label htmlFor={"otherEmail"}>Khác</label>
              </div>
              {orderEmail === "other" && (
                <input
                  type="text"
                  className="border border-gray-300 p-1 outline-green-300"
                  onChange={(e) => {
                    setOtherEmail(e.target.value);
                  }}
                />
              )}
            </div>
          </div>
          {/* phone section */}
          <div className="py-3 border-t border-gray-300 flex flex-col gap-3">
            <h3 className="font-semibold">Số điện thoại nhận hàng</h3>
            {orderEmail}
            <div className="flex flex-col gap-2">
              {user.userOtherPhone.map((phone) => (
                <div className="flex items-center gap-2" key={phone._id}>
                  <input
                    type="checkbox"
                    id={phone._id}
                    checked={phone.phoneNum === orderPhone}
                    value={phone.phoneNum}
                    onChange={(e) => {
                      setOrderPhone(
                        e.target.value === orderPhone ? "" : e.target.value
                      );
                    }}
                  />
                  <label htmlFor={phone._id}>{phone.phoneNum}</label>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={"otherPhone"}
                  onChange={() =>
                    setOrderPhone(orderPhone === "other" ? "" : "other")
                  }
                  checked={orderPhone === "other"}
                />
                <label htmlFor={"otherPhone"}>Khác</label>
              </div>
              {orderPhone === "other" && (
                <input
                  type="text"
                  className="border border-gray-300 p-1 outline-green-300"
                  onChange={(e) => {
                    setOtherPhone(e.target.value);
                  }}
                />
              )}
            </div>
          </div>
          {/* Footer buttons */}
          <div className="mt-6 flex gap-4 justify-end border-t border-gray-200 pt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition"
            >
              Hủy
            </button>
            <button
              onClick={() => addToOrder()}
              className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition"
            >
              Mua hàng
            </button>
          </div>
        </div>

        {/* Animation */}
        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.25s ease-out;
          }
        `}</style>
      </section>
    )
  );
}
