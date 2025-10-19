import Link from "next/link";
import React from "react";

export default function NavigationBarHomePage() {
  return (
    <div className="mt-0 bg-gray-700 text-white lg:block hidden">
      <div className="p-2 flex gap-5 w-full justify-center font-semibold">
        <Link href={`/`}>Trang chủ</Link>
        <Link href={`/login`}>Đăng nhập để truy cập.....</Link>
      </div>
    </div>
  );
}
