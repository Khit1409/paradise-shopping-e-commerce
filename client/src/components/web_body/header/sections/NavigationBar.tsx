import { RootState } from "@/api/Redux/store";
import { getIconByName } from "@/ultis/ultis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function NavigationBar() {
  const { nav } = useSelector((state: RootState) => state.app);
  return (
    <div className="mt-0 bg-gray-700 text-white lg:block hidden">
      <div className="p-2 flex gap-5 w-full justify-center font-semibold">
        {nav.map((n) => (
          <Link key={n._id} href={`/user${n.navUrl}`}>
            {n.navIcon && <FontAwesomeIcon icon={getIconByName(n.navIcon)} />}
            {n.navName}
          </Link>
        ))}
      </div>
    </div>
  );
}
