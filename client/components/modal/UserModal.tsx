"use client";

import { AppDispatch, RootState } from "@/redux/store";
import {
  faDashboard,
  faRightFromBracket,
  faShoppingBag,
  faUserGear,
  faUserPen,
  faUserPlus,
  faUsers,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/service/auth.service";
import { authenticationThunk } from "@/redux/auth/thunk";

type ComponentProps = {
  ref: React.RefObject<HTMLDivElement | null>;
};

/**
 * UserModal component
 * Displays user info, navigation links, and login/logout actions.
 */
export default function UserModal({ ...props }: ComponentProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Redux State
   */
  const { user } = useSelector((state: RootState) => state.auth);
  /** Handle user logout and redirect to homepage if logout succeeds */
  const handleLogout = async () => {
    const rs = await logout("user");
    if (rs.resultCode == 1) {
      const check = await dispatch(authenticationThunk());
      if (authenticationThunk.rejected.match(check)) {
        router.replace("/");
      }
    }
  };

  return user ? (
    <div
      ref={props.ref}
      className="absolute right-0 z-50 mt-2 w-[340px] bg-white rounded-2xl shadow-xl border border-gray-200 p-3 animate-in fade-in slide-in-from-top-3"
    >
      {/* ===== Header Section ===== */}
      <div className="flex items-center gap-3 p-2">
        {/* User avatar */}
        <Image
          src={user?.avatar ?? `/imgs/food.jpg`}
          width={70}
          height={70}
          alt="avatar"
          className="rounded-full object-cover border shadow-sm w-[70px] h-[70px]"
        />
        {/* User information */}
        <div className="flex flex-col">
          <p className="font-semibold text-gray-800">
            {`${user.firtname} ${user.lastname}`}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {user?.email ?? "Please log in"}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {user?.phone ?? ""}
          </p>
        </div>
      </div>

      <hr className="my-2 text-gray-300" />

      {/* ===== Navigation Links ===== */}
      <div className="flex flex-col gap-2 text-[15px]">
        <UserLink
          href={user ? `/user/my-order` : "/login"}
          icon={faShoppingBag}
          label="Đơn hàng của bạn"
        />
        <UserLink
          href={user ? `/user/profile` : "/login"}
          icon={faUserGear}
          label="Chỉnh sửa thông tin"
        />
        <UserLink
          href={user ? `/register` : "/login"}
          icon={faUserPlus}
          label="Đăng ký tài khoản mới"
        />
        <UserLink
          href={"/register-seller"}
          icon={faUsers}
          label="Trở thành người bán hàng"
        />
        <UserLink
          href={"/seller-login"}
          icon={faDashboard}
          label="Đăng nhập trang người bán"
        />
      </div>

      <hr className="my-2 text-gray-300" />

      {/* ===== Footer Section (Login / Logout Button) ===== */}
      <div className="py-2 text-center">
        {user ? (
          /** Logout button if user is logged in */
          <button
            onClick={handleLogout}
            className="w-full py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
            Logout
          </button>
        ) : (
          /** Login button if user is not logged in */
          <Link
            href="/login"
            className="block w-full py-2 text-green-600 hover:bg-green-50 rounded-xl font-medium transition-all"
          >
            <FontAwesomeIcon icon={faUserPen} className="me-2" />
            Login
          </Link>
        )}
      </div>
    </div>
  ) : (
    <div
      ref={props.ref}
      className="absolute right-0 z-50 mt-2 w-[340px] bg-white rounded-2xl shadow-xl border border-gray-200 p-3 animate-in fade-in slide-in-from-top-3"
    >
      Chưa đăng nhập......
    </div>
  );
}

/**
 * UserLink component
 * Renders a reusable navigation link inside the user modal.
 */
const UserLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: IconDefinition;
  label: string;
}) => (
  <Link
    href={href}
    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all text-gray-700 hover:text-black"
  >
    <FontAwesomeIcon icon={icon} className="text-gray-500 text-lg w-5" />
    <span>{label}</span>
  </Link>
);
