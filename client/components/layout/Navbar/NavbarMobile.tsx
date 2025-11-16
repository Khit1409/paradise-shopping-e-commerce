"use client";

import { AppDispatch, RootState } from "@/redux/store";
import {
  faBars,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { NAV_TOGGLE_LIST } from "./data";
import { getIconByName } from "@/utils/getIconByName";
import { useRouter } from "next/navigation";
import { logout } from "@/service/auth.service";
import { openResponsiveMode } from "@/redux/app/slice";
import { authenticationThunk } from "@/redux/auth/thunk";
import Logo from "@/components/common/Logo";

export default function NavBarMobile() {
  const router = useRouter();
  /**
   * redux state
   */
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { nav, openResponsive } = useSelector((state: RootState) => state.app);
  const { carts } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  /**
   * component state
   */

  /**
   * handle
   */

  const closeResponesive = () => {
    dispatch(openResponsiveMode());
  };
  /**
   * logout
   */
  /** Handle user logout and redirect to homepage if logout succeeds */
  const handleLogout = async () => {
    closeResponesive();
    const rs = await logout("user");
    if (rs.success) {
      const check = await dispatch(authenticationThunk("user"));
      if (authenticationThunk.rejected.match(check)) {
        router.replace("/");
      }
    }
  };
  return openResponsive ? (
    <section className="lg:hidden p-3 text-gray-700 bg-white fixed left-0 h-screen max-h-screen border-r border-gray-300 z-9999 overflow-y-auto overflow-x-hidden">
      {/* logo */}
      <div className="border-b py-2 border-gray-300 flex items-center justify-center">
        <Logo />
      </div>
      <div className="flex gap-3 border-b py-2 border-gray-300">
        {/* toggle modal */}
        <div className="flex gap-3 justify-around">
          {/* bar toggle */}
          <button
            className=""
            onClick={() => {
              dispatch(openResponsiveMode());
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {/* button list */}
          {NAV_TOGGLE_LIST.map((toggle, index) => (
            <Link
              key={index}
              href={toggle.toggleUrl}
              onClick={() => {
                closeResponesive();
              }}
            >
              <FontAwesomeIcon icon={getIconByName(toggle.toggleIcon)} />
              {toggle.toggleIcon === "faCartShopping" && (
                <span className="text-red-500 text-sm border border-red-500 px-1 rounded-full">
                  {carts.length}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
      {/* navigation */}
      <div className="py-2 border-b border-gray-300">
        <div className="flex flex-col gap-3 pt-2 uppercase text-sm">
          {isLoggedIn ? (
            nav.map((list) => (
              <Link
                key={list._id}
                onClick={() => closeResponesive()}
                href={`/user/${list.url}`}
                className="hover:underline"
              >
                {list.name}
              </Link>
            ))
          ) : (
            <div className="p-2 flex gap-3 flex-col pt-2 text-sm uppercase">
              <Link className="hover:underline" href={`/`}>
                Trang chủ
              </Link>
              <Link className="hover:underline" href={`/login`}>
                Đăng nhập để truy cập.....
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* logout login option */}
      <div className="py-2">
        {isLoggedIn ? (
          <div className="text-center">
            <button
              onClick={() => {
                handleLogout();
              }}
              className="text-red-500 hover:text-red-600 hover:underline"
            >
              LOGOUT <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Link
              href={"/login"}
              className="hover:underline"
              onClick={() => {
                closeResponesive();
              }}
            >
              LOGIN <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        )}
      </div>
    </section>
  ) : null;
}
