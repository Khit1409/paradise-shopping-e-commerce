import { RootState } from "@/api/redux/store";
import { getIconByName } from "@/ultis/ultis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
/**
 * Component props (null)
 */
/**
 * Function component
 * @returns
 */
export default function NavigationBar() {
  /**
   * 
   */
  const { nav } = useSelector((state: RootState) => state.app);
  /**
   * 
   */
  return (
    <div className="mt-0 bg-gray-700 text-white lg:block hidden">
      <div className="p-2 flex gap-5 w-full justify-center">
        {nav.map((n) => (
          <Link key={n._id} href={`/user${n.navUrl}`} className="uppercase text-sm">
            {n.navIcon && <FontAwesomeIcon icon={getIconByName(n.navIcon)} />}
            {n.navName}
          </Link>
        ))}
      </div>
    </div>
  );
}
