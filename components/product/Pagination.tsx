import { faPersonWalkingArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { SetStateAction } from "react";

type ComponentProps = {
  setPage: React.Dispatch<SetStateAction<number>>;
  page: number;
};
export default function Pagination({ setPage, page }: ComponentProps) {
  return (
    <section className="w-full text-gray-700">
      <div className="p-1 flex justify-center items-center gap-5">
        <button
          disabled={page == 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <FontAwesomeIcon
            icon={faPersonWalkingArrowRight}
            className="transform-[scaleX(-1)]"
          />
        </button>
        <p className="border px-2 rounded-full border-gray-300">{page}</p>
        <button onClick={() => setPage((prev) => prev + 1)}>
          <FontAwesomeIcon icon={faPersonWalkingArrowRight} />
        </button>
      </div>
    </section>
  );
}
