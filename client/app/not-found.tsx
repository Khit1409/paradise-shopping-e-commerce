import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export default function PageNotFound() {
  return (
    <div className="h-[70vh] flex items-center justify-center bg-white">
      <div className="w-max">
        <h1 className="w-max">I AM SORY THIS PAGE IS NOT FOUND !</h1>
        <Link
          href={"/"}
          className="mt-3 text-blue-500 hover:underline text-center"
        >
          Go to home page
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </div>
    </div>
  );
}
