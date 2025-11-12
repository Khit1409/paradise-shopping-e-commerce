"use client";
import { getIconByName } from "@/utils/getIconByName";
import {
  faArrowRightFromBracket,
  faHamburger,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { SELLER_NAV } from "../data";
import Avatar from "@/components/common/Avatar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import { logout } from "@/service/auth.service";
import { useRouter } from "next/navigation";
/**
 * function component
 * @returns
 */
export default function SellerNavBar() {
  /**
   * component states
   */
  const router = useRouter();
  /**
   * render
   */
  const dispatch = useDispatch<AppDispatch>();
  async function handleLogout() {
    dispatch(onLoadingAction(true));
    const res = await logout("seller");
    if (res) {
      dispatch(onLoadingAction(false));
      if (res.success) {
        dispatch(onSuccessfulModel(true));
        return router.replace("/login");
      } else {
        dispatch(
          onErrorModel({ onError: true, mess: res.message ?? "Thất bại" })
        );
        return;
      }
    }
  }
  return (
    <div className="text-gray-700 w-50 h-screen border-gray-300 border p-2 bg-white max-w-50 overflow-y-auto">
      <div className="flex flex-col">
        <div className="flex justify-between items-center py-1">
          <Avatar />
          <button className="p-1 border border-gray-300">
            <FontAwesomeIcon icon={faHamburger} className="text-3xl" />
          </button>
        </div>
        {SELLER_NAV.map((nav) => (
          <div key={nav.id} className="flex flex-col gap-3 border-b py-2">
            <span className="font-semibold uppercase">{nav.category}</span>
            {nav.items.map((item) => (
              <div key={item.id}>
                <Link href={item.url} className="text-wrap">
                  {item.icon?.length > 0 &&
                    item.icon?.map((i) => (
                      <FontAwesomeIcon key={i} icon={getIconByName(i)} />
                    ))}
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        ))}
        <div className="flex flex-col gap-3 py-2">
          <button
            className="text-wrap hover:underline text-red-500"
            onClick={async () => await handleLogout()}
          >
            LOGOUT <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </button>
        </div>
      </div>
    </div>
  );
}
