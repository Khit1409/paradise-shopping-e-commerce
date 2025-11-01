import {
  faBell,
  faMessage,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Logo from "@/components/common/Logo";
import Link from "next/link";
/**
 * Function component
 * @returns
 */
export default function SellerHeader() {
  return (
    <section className="h-[60px] max-h-[60px] border border-gray-300 p-2 bg-white">
      <div className="flex justify-between items-center w-full">
        {/* logo */}
        <Link href={"/seller"}>
          <Logo />
        </Link>
        <div className="flex gap-2">
          <div className="flex gap-5 px-2 ">
            <button>
              <FontAwesomeIcon icon={faBell} />
            </button>
            <button>
              <FontAwesomeIcon icon={faMessage} />
            </button>
            <button>
              <FontAwesomeIcon icon={faUserCircle} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
