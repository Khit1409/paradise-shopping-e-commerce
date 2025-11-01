import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function FooterTop() {
  /**
   * redux state
   */
  const { nav } = useSelector((state: RootState) => state.app);

  return (
    <section className="p-2 flex justify-center items-center gap-5 border-b border-gray-300">
      {nav.map((n) => (
        <Link href={n.navUrl} key={n._id} className="uppercase hover:underline">
          {n.navName}
        </Link>
      ))}
    </section>
  );
}
