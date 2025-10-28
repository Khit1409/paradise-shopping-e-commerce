import React from "react";
import { FOOTER_MIDDLE_LIST } from "./api/footer";
import Link from "next/link";

export default function FooterMiddle() {
  return (
    <section className="flex justify-around items-start p-2 border-b border-gray-300">
      {FOOTER_MIDDLE_LIST.map((list, index) => (
        <div key={index} className="flex flex-col gap-1 p-2 justify-start">
          <p className="font-semibold">{list.category}</p>
          {list.content.map((content) => (
            <Link
              key={content._id}
              href={content.serviceUrl}
              className="hover:tracking-wider hover:underline"
            >
              {content.serviceName}
            </Link>
          ))}
        </div>
      ))}
    </section>
  );
}
