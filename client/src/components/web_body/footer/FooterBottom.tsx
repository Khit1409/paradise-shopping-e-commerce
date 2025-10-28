import Link from "next/link";
import React from "react";

export default function FooterBottom() {
  return (
    <section className="p-2 text-center">
      <p>
        &copy; Mọi thông tin bản quyền xin liên hệ
        <Link
          href={"mailto:khitquangdai1409@gmail.com"}
          className="mx-1 text-blue-500 underline italic text-sm"
        >
          khitquangdai1409@gmail.com
        </Link>
        hoặc
        <Link
          href={"tel:0793844821"}
          className="mx-1 text-blue-500 underline italic text-sm"
        >
          0793844821
        </Link>
        . Không copy dưới mọi hình thức!
      </p>
    </section>
  );
}
