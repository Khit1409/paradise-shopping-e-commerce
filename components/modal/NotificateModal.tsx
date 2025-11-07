import React from "react";

type ComponentProps = {
  ref: React.RefObject<HTMLDivElement | null>;
};

export default function NotificateModal({ ...props }: ComponentProps) {
  return (
    <div
      ref={props.ref}
      className="absolute right-0 z-40 min-w-[350px] text-gray-700 bg-white border border-gray-300"
    >
      <div className="p-3">
        <div>
          <strong className="text-sm  font-semibold">Name notification</strong>
          <p className="truncate text-nowrap max-w-[350px] text-sm italic">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            provident sunt hic nostrum, quis rerum maiores dolorum obcaecati
            aliquid ea distinctio ipsam officiis consequatur animi voluptate
            non, velit repudiandae sed!
          </p>
        </div>
      </div>
    </div>
  );
}
