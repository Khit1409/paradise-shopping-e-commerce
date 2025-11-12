import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function FooterTop() {
  /**
   * redux state
   */
  const { nav } = useSelector((state: RootState) => state.app);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <section className="p-2 flex justify-center items-center gap-5 border-b border-gray-300">
      {isLoggedIn ? (
        nav.map((n) => (
          <Link href={n.url} key={n._id} className="uppercase hover:underline">
            {n.name}
          </Link>
        ))
      ) : (
        <div className="p-2 flex gap-3 pt-2 text-sm uppercase">
          <Link className="hover:underline" href={`/`}>
            Trang chủ
          </Link>
          <Link className="hover:underline" href={`/login`}>
            Đăng nhập để truy cập.....
          </Link>
        </div>
      )}
    </section>
  );
}
