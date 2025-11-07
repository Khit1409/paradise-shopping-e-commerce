import React, { SetStateAction } from "react";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onErrorModel, onLoadingAction } from "@/redux/app/slice";
import { uploadImageToCloud } from "@/service/cloud.service";
import { ProductInformationUpdate } from "@/hook/seller/product/EditProductHook";

type ComponentProps = {
  editProductInformation: ProductInformationUpdate;
  setEditProductInformation: React.Dispatch<
    SetStateAction<ProductInformationUpdate>
  >;
};

export default function EditProductInformation(props: ComponentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { setEditProductInformation, editProductInformation } = props;
  const { proDescription, proImg, proName, proPrice, proSale } =
    editProductInformation;

  const updateThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    dispatch(onLoadingAction(true));
    if (files) {
      const file = files[0];
      const res = await uploadImageToCloud(file);
      const { resultCode, url } = res;
      if (res) {
        dispatch(onLoadingAction(false));
        if (resultCode == 1) {
          return setEditProductInformation((prev) => ({
            ...prev,
            proImg: url,
          }));
        } else {
          return dispatch(
            onErrorModel({
              onError: true,
              mess: "Lỗi cập nhật ảnh, vui lòng thử lại!",
            })
          );
        }
      }
    }
  };
  return (
    <section className="mb-3">
      <h4 className="uppercase font-bold mb-3">cập nhật thông tin sản phẩm</h4>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="" className="uppercase text-sm font-bold">
          Tên sản phẩm
        </label>
        <input
          type="text"
          className="border outline-0 border-gray-300 p-1 "
          defaultValue={proName}
          onChange={(e) => {
            setEditProductInformation((prev) => ({
              ...prev,
              proName: e.target.value,
            }));
          }}
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="" className="uppercase text-sm font-bold">
          Giá sản phẩm
        </label>
        <input
          type="number"
          className="border outline-0 border-gray-300 p-1 "
          value={proPrice}
          onChange={(e) => {
            setEditProductInformation((prev) => ({
              ...prev,
              proPrice: Number(e.target.value),
            }));
          }}
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="" className="uppercase text-sm font-bold">
          Giá khuyến mãi
        </label>
        <input
          type="number"
          className="border outline-0 border-gray-300 p-1"
          value={proSale}
          onChange={(e) => {
            setEditProductInformation((prev) => ({
              ...prev,
              proSale: Number(e.target.value),
            }));
          }}
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="" className="uppercase text-sm font-bold">
          Mô tả sản phẩm
        </label>
        <textarea
          className="border outline-0 border-gray-300 p-1 h-[200px]"
          defaultValue={proDescription}
          onChange={(e) => {
            setEditProductInformation((prev) => ({
              ...prev,
              proDescription: e.target.value,
            }));
          }}
        />
      </div>
      <div className="w-[200px]">
        <h5 className="font-bold uppercase mb-3">ảnh bìa sản phẩm</h5>
        <label htmlFor="thumb" className="w-[200px] hover:bg-red-300">
          {proImg && (
            <Image
              src={proImg}
              alt="thumbnail"
              width={200}
              height={200}
              className="w-[200px] border border-gray-300"
            />
          )}
          <input
            type="file"
            accept="image/*"
            id="thumb"
            onChange={(e) => {
              updateThumbnail(e);
            }}
            className="hidden w-[200px]"
          />
        </label>
      </div>
    </section>
  );
}
