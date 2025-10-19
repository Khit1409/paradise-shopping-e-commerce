import { faHistory, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

/**
 * Type and interface
 */
interface SavedAttributeValue {
  value: string;
  img?: File;
}
/**
 * Component props
 */
type ComponentProps = {
  setSavedAttrValue: Dispatch<SetStateAction<SavedAttributeValue[]>>;
  handleOnchangeAttrValue: (
    e: ChangeEvent<HTMLInputElement>,
    type: "img" | "value",
    index: number
  ) => void;
  setSavedAttrName: Dispatch<SetStateAction<string | undefined>>;
  handleSubmitAttribute: () => void;
  savedAttrName?: string;
  savedAttrValue: SavedAttributeValue[];
};

/**
 * Fuction component react memo
 */
const UpNewProductAttribute = React.memo(function UpNewProductAttribute({
  ...props
}: ComponentProps) {
  /**
   * Component state
   */
  const [attrItemInput, setAttrItemInput] = useState<number>(1);
  /**
   *
   */
  return (
    <section className="p-3 bg-white shadow-md rounded border-gray-200">
      <div className="flex gap-3 flex-col text-gray-700">
        <label htmlFor="" className="font-semibold">
          Lựa chọn khi mua hàng
        </label>
        <input
          onChange={(e) => props.setSavedAttrName(e.target.value)}
          type="text"
          value={props.savedAttrName ?? ""}
          className="border border-gray-300 p-2"
          placeholder="Nhập tên lựa chọn"
        />
        {/* attr item */}
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: attrItemInput }).map((_, inputIdx) => (
            <div className=" flex flex-col gap-2 flex-wrap" key={inputIdx}>
              <div className="flex gap-1 flex-col">
                <label htmlFor={`value-${inputIdx}`} className="font-semibold">
                  Giá trị lựa chọn
                </label>
                <input
                  onChange={(e) =>
                    props.handleOnchangeAttrValue(e, "value", inputIdx)
                  }
                  value={props.savedAttrValue[inputIdx]?.value ?? ""}
                  type="text"
                  id={`value-${inputIdx}`}
                  name={`value-${inputIdx}`}
                  className="border border-gray-300 p-2 w-[200px] "
                  placeholder="giá trị lựa chọn"
                />
              </div>
              <div className="text-center w-[100px]">
                <label
                  htmlFor={`itemImg-${inputIdx}`}
                  className="font-semibold"
                >
                  Ảnh
                  {props.savedAttrValue &&
                  props.savedAttrValue[inputIdx] &&
                  props.savedAttrValue[inputIdx].img ? (
                    <Image
                      src={URL.createObjectURL(
                        props.savedAttrValue[inputIdx].img
                      )}
                      alt={`itemImg-${inputIdx}`}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="w-[100px] h-[100px] border-2 border-dashed text-green-500 border-green-500 flex items-center justify-center">
                      + Ảnh
                    </div>
                  )}
                  <input
                    type="file"
                    name={`itemImg-${inputIdx}`}
                    id={`itemImg-${inputIdx}`}
                    onChange={(e) =>
                      props.handleOnchangeAttrValue(e, "img", inputIdx)
                    }
                    className="hidden w-[100px]"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
        {/* thao tác thêm sửa xóa attribute item input */}
        <div className="flex gap-1 text-white">
          <button
            type="button"
            role="button"
            className="bg-green-500 px-2 py-1"
            onClick={() => setAttrItemInput((prev) => prev + 1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            type="button"
            role="button"
            className="bg-red-500 px-2 py-1"
            onClick={() => {
              setAttrItemInput(1);
              props.setSavedAttrValue([]);
            }}
          >
            <FontAwesomeIcon icon={faHistory} />
          </button>
          <button
            className="bg-green-500 px-2 py-1"
            role="button"
            type="button"
            onClick={() => {
              props.handleSubmitAttribute();
              setAttrItemInput(1);
            }}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
      </div>
    </section>
  );
});

export default UpNewProductAttribute;
