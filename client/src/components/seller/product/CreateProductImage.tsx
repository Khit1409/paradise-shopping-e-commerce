import { uploadImageToCloud } from "@/feature/upload";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faHistory } from "@fortawesome/free-solid-svg-icons/faHistory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { ProductImageDetail } from "../hook/CreateProductHook";
import { AppDispatch } from "@/api/redux/store";
import {
  onErrorModel,
  onLoadingAction,
} from "@/api/redux/slice/app_slice/app.slice";

type ComponentProps = {
  productThumbnail: string;
  setProductThumbnail: React.Dispatch<SetStateAction<string>>;
  productImageDetail: ProductImageDetail[];
  setProductImageDetail: React.Dispatch<SetStateAction<ProductImageDetail[]>>;
};

export default function CreateProductImage(props: ComponentProps) {
  const [quantityInput, setQuantityInput] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const {
    productImageDetail,
    productThumbnail,
    setProductImageDetail,
    setProductThumbnail,
  } = props;
  const onchangeImageDetail = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { files } = e.target;
    dispatch(onLoadingAction(true));
    if (files) {
      const file = files[0];
      const res = await uploadImageToCloud(file);
      const { resultCode, url } = res;
      if (res) {
        dispatch(onLoadingAction(false));
        if (resultCode == 1 && url) {
          return setProductImageDetail((prev) => {
            const imageList = [...(prev ?? [])];
            const existed = imageList[index];
            if (existed) {
              existed.imgUrl = url;
            } else {
              imageList.push({ imgUrl: url });
            }
            return imageList;
          });
        } else {
          return dispatch(
            onErrorModel({
              onError: true,
              mess: "Lỗi trong quá trình tải ảnh!",
            })
          );
        }
      }
    }
  };
  return (
    <section className="mb-3 border-t border-gray-300 py-5">
      <h5 className="mb-3 font-bold">TẠO ẢNH</h5>
      <div>
        <h5 className="mb-3 font-semibold">ẢNH BÌA</h5>
        <div className="flex flex-col gap-1 mb-3">
          <label
            htmlFor="thumb"
            className="w-[100px] h-[100px] flex items-center justify-center border border-green-500 text-green-500"
          >
            {productThumbnail ? (
              <Image src={productThumbnail} alt="" width={100} height={100} />
            ) : (
              "+Ảnh"
            )}
            <input
              type="file"
              id="thumb"
              onChange={async (e) => {
                dispatch(onLoadingAction(true));
                const files = e.target.files;
                if (files) {
                  const file = files[0];
                  const res = await uploadImageToCloud(file);
                  const { resultCode, url } = res;
                  if (res) {
                    dispatch(onLoadingAction(false));
                    if (resultCode == 1) {
                      return setProductThumbnail(url);
                    } else {
                      return dispatch(
                        onErrorModel({
                          onError: true,
                          mess: "Quá trình tải ảnh bị lỗi!",
                        })
                      );
                    }
                  }
                } else {
                  return;
                }
              }}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
      </div>
      {/* img detail */}
      <div>
        <h5 className="mb-3 font-semibold">ẢNH CHI TIẾT</h5>
        <div className="flex gap-5 flex-wrap mb-3">
          {Array.from({ length: quantityInput }).map((_, index) => (
            <div className="flex flex-col gap-1" key={index}>
              <label
                htmlFor={`img-detail-${index}`}
                className="w-[100px] h-[100px] flex items-center justify-center border border-green-500 text-green-500"
              >
                {productImageDetail[index]?.imgUrl ? (
                  <Image
                    src={productImageDetail[index].imgUrl}
                    alt=""
                    width={100}
                    height={100}
                  />
                ) : (
                  "+Ảnh"
                )}
                <input
                  accept="image/*"
                  id={`img-detail-${index}`}
                  type="file"
                  onChange={async (e) => await onchangeImageDetail(e, index)}
                  className="hidden"
                />
              </label>
            </div>
          ))}
        </div>
        {/* action */}
        <div className="mb-3 flex gap-3">
          <button
            className="border border-gray-300 hover:bg-green-500 hover:text-white px-2 py-1"
            onClick={() => setQuantityInput((prev) => prev + 1)}
          >
            THÊM +
          </button>
          <button
            className="border border-gray-300 hover:bg-green-500 hover:text-white px-2 py-1"
            onClick={() => {
              setProductImageDetail((prev) => {
                const index = prev.length - 1;
                return prev.filter((ft, i) => i !== index);
              });
              setQuantityInput((prev) => (prev == 1 ? 1 : prev - 1));
            }}
          >
            <FontAwesomeIcon icon={faHistory} />
          </button>
          <button
            className="border border-gray-300 hover:bg-red-500 hover:text-white px-2 py-1"
            onClick={() => {
              setProductImageDetail([]);
              setQuantityInput(1);
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      </div>
    </section>
  );
}
