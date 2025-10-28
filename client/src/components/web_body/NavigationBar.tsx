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
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  /**
   *
   */
  return isLoggedIn ? (
    <div className="p-5 text-gray-700 bg-white lg:block hidden border-gray-300 border-t">
      <div className="p-2 flex gap-5 w-full justify-center">
        {nav.map((n) => (
          <Link
            key={n._id}
            href={`/user${n.navUrl}`}
            className="uppercase text-sm"
          >
            {n.navIcon && <FontAwesomeIcon icon={getIconByName(n.navIcon)} />}
            {n.navName}
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="p-5 text-gray-700 bg-white lg:block hidden border-gray-300 border-t">
      <div className="p-2 flex gap-5 w-full justify-center">
        <Link href={`/`} className="uppercase text-sm">
          Home
        </Link>
        <Link href={`/about-us`} className="uppercase text-sm">
          about us
        </Link>
        <Link href={`/login`} className="uppercase text-sm">
          Login.....
        </Link>
      </div>
    </div>
  );
}
