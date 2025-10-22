import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction } from "react";
import { CREATE_PRODUCT_BASIC_INPUT_LIST } from "./create_product_form_list";

interface BasicInputRequest {
  name: string;
  hashtag: string;
  sale: number;
  price: number;
  description: string;
}

type ComponentProps = {
  setBasicReq: Dispatch<SetStateAction<BasicInputRequest>>;
};

export default function UpNewProductBasicInput({
  setBasicReq,
}: ComponentProps) {
  return (
    <section className="p-3 bg-white rounded shadow-md">
      {CREATE_PRODUCT_BASIC_INPUT_LIST.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-1 p-1 text-gray-700">
          <label htmlFor="" className="font-semibold ">
            {item.title}
          </label>
          {item.note ? (
            <p className="text-yellow-600">
              <FontAwesomeIcon icon={faWarning} />
              {item.note}
            </p>
          ) : null}
          {item.type === "textarea" ? (
            <textarea
              name={item.name}
              placeholder={item.title}
              onChange={(e) =>
                setBasicReq((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="border border-gray-300 p-2 h-[200px]"
            />
          ) : (
            <input
              type={item.type}
              name={item.name}
              onChange={(e) =>
                setBasicReq((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder={item.title}
              className="border border-gray-300 p-2"
            />
          )}
        </div>
      ))}
    </section>
  );
}
