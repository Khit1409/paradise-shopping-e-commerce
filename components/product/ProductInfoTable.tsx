import { ProductInformation, ProductVariant } from "@/type/product.interface";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { SetStateAction, useState } from "react";
import PriceBox from "./PriceBox";
import { ProductVaritant } from "./ProductVaritant";
import { CartVaritantRequest } from "@/type/cart.interface";

type ComponentProps = {
  setSelectedVaritant: React.Dispatch<
    SetStateAction<CartVaritantRequest | undefined>
  >;
  selectedVaritant?: CartVaritantRequest;
  info: ProductInformation;
  rating: number;
  price: number;
  sale: number;
  varitants: ProductVariant[];
};

export default function ProductInfoTable(props: ComponentProps) {
  /**
   * props
   */
  const {
    info,
    rating,
    price,
    sale,
    varitants,
    selectedVaritant,
    setSelectedVaritant,
  } = props;
  /**
   * component state
   */
  const [showMore, setShowModel] = useState<boolean>(false);
  /**
   *
   */
  return (
    <div className="flex">
      <div className="flex flex-col gap-2">
        <p className="text-2xl uppercase">{info.name}</p>
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, indexOfStart) => (
            <span className="" key={indexOfStart}>
              <FontAwesomeIcon
                className="text-yellow-500 text-xl"
                icon={faStar}
              />
            </span>
          ))}
        </div>
        {/* price & sale */}
        <PriceBox price={price} sale={sale} />
        {/* description */}
        <div className="relative">
          <div
            dangerouslySetInnerHTML={{ __html: info.description }}
            className={`product-description-from-api overflow-y-hidden ${
              showMore ? "h-[200px]" : "h-auto"
            } `}
          />
          <div className="flex justify-start items-center py-2">
            <button
              onClick={() => setShowModel(!showMore)}
              className="text-center text-gray-500"
            >
              {showMore ? "...Ẩn bớt" : "Xem thêm..."}
            </button>
          </div>
        </div>
        {/* varitants */}
        <ProductVaritant
          varitants={varitants}
          selectedVaritant={selectedVaritant}
          setSelectedVaritant={setSelectedVaritant}
        />
      </div>
    </div>
  );
}
