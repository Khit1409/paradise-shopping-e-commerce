import {
  faBell,
  faCartShopping,
  faMessage,
  faSearch,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/api/Redux/store";
import { getUserCartThunk } from "@/api/Redux/Thunk/Product/product.thunk";
import CartModal from "../modals/CartModal";
import NotificateModal from "../modals/NotificateModal";
import MessageModal from "../modals/MessageModal";
import UserModal from "../modals/UserModal";

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
  const { carts } = useSelector((state: RootState) => state.product);
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

  //cal api
  useEffect(() => {
    if (user) {
      (async () => {
        await dispatch(getUserCartThunk());
      })();
    }
  }, [dispatch, user]);

  return (
    <section className="bg-gray-800 text-white">
      <div className="flex px-5 py-3 items-center">
        <div className="flex-1 flex justify-center">
          {/* logo */}
          <div>
            <p className="text-2xl font-extrabold">Logo</p>
          </div>
        </div>
        <div className="flex-2 flex justify-center relative">
          <input
            type="text"
            className="bg-white text-gray-700 w-full border-0 p-2 rounded-[3px] outline-[orangered]"
          />
          <button className="absolute z-20 text-gray-700 right-0 h-full px-3">
            <FontAwesomeIcon icon={faSearch} className="text-2xl" />
          </button>
        </div>
        <div className="flex-1 flex gap-4 justify-end">
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
              <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
              {isLoggedIn && (
                <span className="text-red-500 text-sm">{carts.length}</span>
              )}
              {openCartModal && <CartModal ref={modalRef} />}
            </button>
          </div>
          {/* notification */}
          <div className="relative">
            <button
              className="text-2xl"
              onClick={() => {
                setOpenMessage(false);
                setOpenNotificate(!openNotificate);
                setOpenUserModal(false);
                setOpenCartModal(false);
              }}
            >
              <FontAwesomeIcon icon={faBell} />
              <span className="text-red-500 text-sm">2</span>
            </button>
            {openNotificate && <NotificateModal ref={modalRef} />}
          </div>
          {/* message */}
          <div className="relative">
            <button
              className="text-2xl"
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
              className="text-2xl"
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
