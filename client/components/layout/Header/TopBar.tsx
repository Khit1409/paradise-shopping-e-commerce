import {
  faBell,
  faMessage,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import {
  faBars,
  faCartShopping,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import CartModal from "@/components/modal/CartModal";
import NotificateModal from "@/components/modal/NotificateModal";
import MessageModal from "@/components/modal/MessageModal";
import UserModal from "@/components/modal/UserModal";
import { getCartThunk } from "@/redux/cart/thunk";
import { openResponsiveMode } from "@/redux/app/slice";
import Logo from "@/components/common/Logo";
import { getOrderThunk } from "@/redux/order/thunk";
import { getUserNotificationThunk } from "@/redux/app/thunk";

export default function TopBar() {
  /**
   * use state
   */
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);
  const [openNotificate, setOpenNotificate] = useState<boolean>(false);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);
  /**
   *
   */
  const dispatch = useDispatch<AppDispatch>();
  /**
   *
   */
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { carts } = useSelector((state: RootState) => state.cart);
  const { reRender, notifications } = useSelector(
    (state: RootState) => state.app
  );
  /**
   * helper: get quantity of cart , notification and message
   */
  const cartQuantity = carts.length;
  const notifiCationQuantity = notifications.filter((ft) => !ft.seen).length;
  /**
   * UseEffect
   */
  //close all modal if click outside
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // nếu click ngoài vùng modal
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenMessage(false);
        setOpenCartModal(false);
        setOpenNotificate(false);
        setOpenUserModal(false);
      }
    };

    //listener event
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (user) {
      (async () => {
        await Promise.all([
          dispatch(getCartThunk()),
          dispatch(getOrderThunk()),
          dispatch(getUserNotificationThunk()),
        ]);
      })();
    }
  }, [dispatch, user, reRender]);

  return (
    <section className="bg-white text-gray-700 p-5">
      <div className="flex items-center lg:justify-around justify-between lg:gap-0 gap-5">
        <div className="flex lg:flex-1 justify-center items-center">
          {/* logo */}
          <div>
            <div className="hidden lg:block">
              <Logo />
            </div>
            {/* bar toggle */}
            <button
              className="block lg:hidden p-2 border rounded"
              onClick={() => {
                dispatch(openResponsiveMode());
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
        {/* search */}
        <div className="flex-2 flex justify-center relative">
          <input
            type="text"
            className="border-gray-700 border text-gray-700 w-full p-2 rounded-[3px] outline-none text-center"
          />
          <button className="absolute z-20 text-gray-700 right-0 h-full px-3">
            <FontAwesomeIcon icon={faSearch} className="text-xl" />
          </button>
        </div>
        {/* toggle */}
        <div className="flex-1 lg:flex gap-4 justify-end hidden">
          {/* carts */}
          <div className="p-1 relative">
            <button
              onClick={() => {
                setOpenCartModal(!openCartModal);
                setOpenMessage(false);
                setOpenNotificate(false);
                setOpenUserModal(false);
              }}
              className=""
            >
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
              {isLoggedIn && (
                <span className="text-red-500 text-sm">
                  {cartQuantity > 0 ? cartQuantity : null}
                </span>
              )}
              {openCartModal && <CartModal ref={modalRef} />}
            </button>
          </div>
          {/* notification */}
          <div className="relative">
            <button
              className="text-xl"
              onClick={() => {
                setOpenMessage(false);
                setOpenNotificate(!openNotificate);
                setOpenUserModal(false);
                setOpenCartModal(false);
              }}
            >
              <FontAwesomeIcon icon={faBell} />
              <span className="text-red-500 text-sm">
                {notifiCationQuantity > 0 ? notifiCationQuantity : null}
              </span>
            </button>
            {openNotificate && <NotificateModal ref={modalRef} />}
          </div>
          {/* message */}
          <div className="relative">
            <button
              className="text-xl"
              onClick={() => {
                setOpenMessage(!openMessage);
                setOpenNotificate(false);
                setOpenUserModal(false);
                setOpenCartModal(false);
              }}
            >
              <FontAwesomeIcon icon={faMessage} />
              <span className="text-red-500 text-sm">2</span>
            </button>
            {openMessage && <MessageModal ref={modalRef} />}
          </div>
          {/* user Modal */}
          <div className="relative">
            <button
              onClick={() => {
                setOpenMessage(false);
                setOpenNotificate(false);
                setOpenUserModal(!openUserModal);
                setOpenCartModal(false);
              }}
              className="text-xl"
            >
              <FontAwesomeIcon icon={faUserCircle} />
            </button>
            {openUserModal && <UserModal ref={modalRef} />}
          </div>
        </div>
      </div>
    </section>
  );
}
