import { CartVaritantRequest } from "@/type/cart.interface";
import { ProductVariant } from "@/type/product.interface";
import Image from "next/image";
import React, { SetStateAction } from "react";
type OnchangeVaritants = {
  sku: string;
  name: string;
  value?: string;
};
type ComponentProps = {
  setSelectedVaritant: React.Dispatch<
    SetStateAction<CartVaritantRequest | undefined>
  >;
  selectedVaritant?: CartVaritantRequest;
  varitants: ProductVariant[];
};
export const ProductVaritant = (props: ComponentProps) => {
  const { setSelectedVaritant, selectedVaritant, varitants } = props;
  //onchange attribute
  const onchangeVaritant = (param: OnchangeVaritants) => {
    const { sku, name, value } = param;
    setSelectedVaritant((prev) => {
      if (prev?.sku === sku) {
        let varitantAttr = [...(prev.attributes ?? [])];
        const index = varitantAttr.findIndex((f) => f.name === name);
        if (index !== -1) {
          varitantAttr[index] = {
            ...varitantAttr[index],
            name: name ?? varitantAttr[index].name,
            value: value ?? varitantAttr[index].value,
          };
        } else {
          varitantAttr = [...varitantAttr, { name: name, value: value || "" }];
        }
        return { ...prev, attributes: varitantAttr };
      }
      return { sku, attributes: [{ name, value: value || "" }] };
    });
  };

  const checkedValue = (sku: string, name: string, value: string) => {
    if (selectedVaritant?.sku === sku) {
      const selected = selectedVaritant.attributes.find((f) => f.name === name);
      return selected?.value === value
        ? "bg-blue-500 text-white"
        : "bg-white hover:bg-gray-200";
    }
  };

  return (
    <div className="py-2">
      <h4 className="py-2 border-b border-gray-300 mb-3">PHÂN LOẠI SẢN PHẨM</h4>
      <div className="grid grid-cols-2 gap-5">
        {varitants.map((varitant, indexOfVart) => (
          <div key={indexOfVart} className="flex flex-col gap-2">
            <p className="uppercase">{varitant.sku}</p>
            <p className="text-sm">
              còn:<span className="ms-1">{varitant.stoke}</span>
            </p>
            {varitant.image ? (
              <Image
                src={varitant.image}
                width={100}
                height={100}
                alt=""
                objectFit="cover"
              />
            ) : null}
            {/* attribute => name & value */}
            <div className="flex flex-col gap-2">
              {varitant.attributes.map((vartAttr) => (
                <div className="flex flex-col gap-2" key={vartAttr.name}>
                  <p className="font-bold">{vartAttr.name}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {vartAttr.value.map((val, indexOfVal) => (
                      <button
                        key={indexOfVal}
                        onClick={() => {
                          onchangeVaritant({
                            sku: varitant.sku,
                            name: vartAttr.name,
                            value: val,
                          });
                        }}
                        className={`border border-gray-300 px-2 py-1 hover:bg-gray-400 ${checkedValue(
                          varitant.sku,
                          vartAttr.name,
                          val
                        )}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
