"use client";
import { SELLER_NAV } from "@/api/seller_navbar";
import { getIconByName } from "@/ultis/ultis";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
/**
 * function component
 * @returns
 */
export default function SellerNavigationBar() {
  /**
   * component states
   */
  const [showNavName, setShowNavName] = useState<boolean>(true);
  /**
   * render
   */
  return (
    <div className="text-gray-700 h-screen border-gray-300 border p-2 w-[350px]">
      <div className="flex flex-col gap-5">
        <div>
          <button
            className="p-1 border border-gray-300"
            onClick={() => setShowNavName(!showNavName)}
          >
            <FontAwesomeIcon icon={faHamburger} />
          </button>
        </div>
        {SELLER_NAV.map((nav) => (
          <div key={nav.id} className="flex flex-col gap-3 text-sm">
            <p className="font-semibold uppercase">{nav.category}</p>
            {nav.items.map((item) => (
              <div key={item.id}>
                <Link href={item.url}>
                  <FontAwesomeIcon icon={getIconByName(item.icon)} />
                  {showNavName && item.name}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
