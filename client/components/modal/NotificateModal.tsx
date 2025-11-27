"use client";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

type ComponentProps = {
  ref: React.RefObject<HTMLDivElement | null>;
};

export default function NotificateModal({ ...props }: ComponentProps) {
  const { notifications } = useSelector((state: RootState) => state.app);
  /**
   * html
   */
  return (
    <div
      ref={props.ref}
      className="absolute right-0 z-40 min-w-[350px] text-gray-700 bg-white border border-gray-300"
    >
      <div className="p-3 flex flex-col gap-2">
        {notifications.map((notif) => (
          <div key={notif.id} className="text-sm">
            <Link
              href={"/user/my-notification"}
              className="text-sm  font-semibold flex justify-between"
            >
              <span className="hover:underline text-blue-500">
                {notif.name}
              </span>
              <span>
                {new Date(notif.created_at).toLocaleDateString("vi-VN")}
              </span>
            </Link>
            <p className="truncate text-nowrap max-w-[350px] text-sm italic">
              {notif.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
