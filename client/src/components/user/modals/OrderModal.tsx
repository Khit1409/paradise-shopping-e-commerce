"use client";

import OrderAttributePreview from "../orders/form/OrderAttributePreview";
import OrderProductInfo from "../orders/form/OrderProductInfo";
import OrderSelectAddress from "../orders/form/OrderSelectAddress";
import OrderSelectEmail from "../orders/form/OrderSelectEmail";
import OrderSelectPaymentMethod from "../orders/form/OrderSelectPaymentMethod";
import OrderSelectPhone from "../orders/form/OrderSelectPhone";
import OrderSelectShippingMethod from "../orders/form/OrderSelectShippingMethod";
import { OrderModalHook } from "../orders/hooks/orderModalHook";

/**
 * function component
 * @returns
 */
export default function OrderModal() {
  /**
   * states of component
   */
  const {
    orderState,
    user,
    onchangeAddress,
    setKindOfPay,
    addToOrder,
    closeModal,
    kindOfPay,
    kindOfShip,
    orderAddress,
    orderPhone,
    orderEmail,
    setKindOfShip,
    setOtherAddress,
    setOrderEmail,
    setOtherEmail,
    setOrderPhone,
    setOtherPhone,
  } = OrderModalHook();

  /** Prevent render if modal is closed */
  if (!orderState || !orderState.open) return null;
  /**
   * return
   */
  return (
    user &&
    orderState &&
    orderState.items && (
      <section
        className="fixed inset-0 text-gray-700 z-999 flex items-center justify-center bg-black/60"
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
          <OrderProductInfo orderItem={orderState.items} />

          {/* Attribute section */}
          <OrderAttributePreview orderItem={orderState.items} />
          {/* Shipping method */}
          <OrderSelectShippingMethod
            setKindOfShip={setKindOfShip}
            kindOfShip={kindOfShip}
          />
          {/* Payment method */}
          <OrderSelectPaymentMethod
            kindOfPay={kindOfPay}
            setKindOfPay={setKindOfPay}
          />
          {/* Address section */}
          <OrderSelectAddress
            onchange={onchangeAddress}
            orderAddress={orderAddress}
            setOtherAddress={setOtherAddress}
            user={user}
          />

          {/* email section */}
          <OrderSelectEmail
            orderEmail={orderEmail}
            setOrderEmail={setOrderEmail}
            setOtherEmail={setOtherEmail}
            userOtherEmail={user.userOtherEmail}
          />
          {/* phone section */}
          <OrderSelectPhone
            orderPhone={orderPhone}
            setOrderPhone={setOrderPhone}
            setOtherPhone={setOtherPhone}
            userOtherPhone={user.userOtherPhone}
          />
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
