import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

type ComponentProps = {
  savedImg?: File;
  savedImgDetail?: File[];
  setSavedImgDetail: Dispatch<SetStateAction<File[]>>;
  setSavedImg: Dispatch<SetStateAction<File | undefined>>;
};

export default function UpNewProductImg({
  savedImg,
  setSavedImgDetail,
  setSavedImg,
  savedImgDetail,
}: ComponentProps) {
  const [lenghtImgDetailInput, setLengImgDetailInput] = useState<number>(1);
  return (
    <section className="flex flex-col gap-3 p-3 shadow-md rounded border-gray-300 bg-white">
      {/* avt product */}
      <div className="text-gray-700 w-[100px] text-center">
        <label htmlFor="newAvatar" className="font-semibold ">
          Ảnh bìa
          {savedImg ? (
            <div>
              <Image
                src={URL.createObjectURL(savedImg)}
                width={100}
                height={100}
                alt="proImg"
                className="mt-2"
              />
            </div>
          ) : (
            <div className="border-2 mt-2 text-green-500 border-green-500 border-dashed w-[100px] h-[100px] flex items-center justify-center">
              + Ảnh
            </div>
          )}
          <input
            required
            type="file"
            id="newAvatar"
            name="newAvatar"
            onChange={(e) =>
              setSavedImg(() => {
                const file = e.target.files?.[0];
                if (!file) {
                  return;
                }
                return file;
              })
            }
            className="w-[100px] hidden"
            accept="image/*"
          />
        </label>
      </div>
      {/* img detail */}
      <div className="grid grid-cols-3 text-center gap-3">
        {Array.from({ length: lenghtImgDetailInput }).map(
          (_, indexImgInput) => (
            <div className="text-gray-700 w-[100px]" key={indexImgInput}>
              <label
                htmlFor={`img-${indexImgInput}`}
                className="font-semibold "
              >
                Ảnh mô tả
                {savedImgDetail && savedImgDetail[indexImgInput] ? (
                  <Image
                    src={URL.createObjectURL(savedImgDetail[indexImgInput])}
                    alt={`img-${indexImgInput}`}
                    key={indexImgInput}
                    width={100}
                    height={100}
                  />
                ) : (
                  <div
                    className="w-[100px] h-[100px] border-2 border-dashed flex items-center justify-center border-green-500 text-gray-500"
                    key={indexImgInput}
                  >
                    +Ảnh
                  </div>
                )}
                <input
                  required
                  type="file"
                  name={`img-${indexImgInput}`}
                  id={`img-${indexImgInput}`}
                  onChange={(e) =>
                    setSavedImgDetail((prev) => {
                      const file = e.target.files?.[0];
                      if (!file) {
                        return prev;
                      }
                      const otherFiles = prev.filter(
                        (f) => f.name !== file.name
                      );
                      return [...otherFiles, file];
                    })
                  }
                  className="hidden w-[100px]"
                  accept="image/*"
                />
              </label>
            </div>
          )
        )}
      </div>
      {/* thao tác thêm sửa xóa img detail input */}
      <div className="flex gap-1 text-white">
        <button
          type="button"
          role="button"
          className="bg-red-500 w-[25px] h-[25px]"
          onClick={() => {
            setSavedImgDetail([]);
            setLengImgDetailInput(1);
          }}
        >
          <FontAwesomeIcon icon={faHistory} />
        </button>
        {/* add */}
        <button
          type="button"
          role="button"
          className="bg-green-500 w-[25px] h-[25px]"
          onClick={() => {
            setLengImgDetailInput((prev) => prev + 1);
          }}
        >
          +
        </button>
      </div>
    </section>
  );
}
