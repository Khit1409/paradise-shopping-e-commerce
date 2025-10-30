import React, { SetStateAction } from "react";
import { ProductImageDetailUpdate } from "../hook/EditProductHook";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/api/redux/store";
import { onLoadingAction } from "@/api/redux/slice/app_slice/app.slice";
import { uploadImageToCloud } from "@/feature/upload";
import Image from "next/image";
type ComponentProps = {
  editProductImageDetail: ProductImageDetailUpdate[];
  setEditProductImageDetail: React.Dispatch<
    SetStateAction<ProductImageDetailUpdate[]>
  >;
};
export default function EditImageDetailt(props: ComponentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { editProductImageDetail, setEditProductImageDetail } = props;
  /**
   * render
   */
  const onchangeImageDetail = async (
    e: React.ChangeEvent<HTMLInputElement>,
    indexOfImage: number
  ) => {
    const { files } = e.target;
    if (files) {
      dispatch(onLoadingAction(true));
      const file = files[0];
      const res = await uploadImageToCloud(file);
      const { resultCode, url } = res;
      if (res) {
        dispatch(onLoadingAction(false));
        if (resultCode === 1) {
          setEditProductImageDetail((prev) => {
            let data = [...prev];
            if (data[indexOfImage]) {
              data[indexOfImage] = { ...data[indexOfImage], imgUrl: url };
            } else {
              data = [
                ...data,
                { _id: Date.now().toLocaleString(), imgUrl: url },
              ];
            }
            return data;
          });
        }
      }
    }
  };
  return (
    <section className="mb-3">
      <h5 className="font-bold mb-3 uppercase">cập nhật ảnh chi tiết</h5>
      <div className="grid grid-cols-5 gap-3">
        {editProductImageDetail.map((imgs, indexOfImage) => (
          <label key={imgs._id} htmlFor={`image-${indexOfImage}`}>
            <Image
              src={imgs.imgUrl}
              alt=""
              width={200}
              height={100}
              className="border border-gray-300 h-[100px]"
            />
            <input
              type="file"
              id={`image-${indexOfImage}`}
              accept="image/*"
              className="hidden"
              onChange={(e) => onchangeImageDetail(e, indexOfImage)}
            />
          </label>
        ))}
        <label
          htmlFor={`image-${editProductImageDetail.length}`}
          className="w-[200px] h-[200x] flex items-center justify-center border border-green-500 text-green-500"
        >
          +Ảnh
          <input
            id={`image-${editProductImageDetail.length}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              onchangeImageDetail(e, editProductImageDetail.length)
            }
          />
        </label>
      </div>
    </section>
  );
}
