import { onErrorModel, onLoadingAction } from "@/redux/app/slice";
import { AppDispatch } from "@/redux/store";
import { uploadImageToCloud } from "@/service/cloud.service";
import { SingleProduct } from "@/type/product.interface";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

/**
 * props type
 */
type ComponentProps = {
  setData: React.Dispatch<React.SetStateAction<SingleProduct | null>>;
  data: SingleProduct;
};
/**
 *
 * @returns
 */
export default function EditImage(props: ComponentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { setData, data } = props;
  /**
   * onchange images
   * @param index
   * @param file
   */
  const onChangeImages = async (index: number, file: File) => {
    dispatch(onLoadingAction(true));
    const res = await uploadImageToCloud(file);
    dispatch(onLoadingAction(false));

    if (!res || res.resultCode !== 1) {
      return dispatch(
        onErrorModel({ onError: true, mess: "Lỗi tải ảnh lên đám mây" })
      );
    }

    setData((prev) => {
      if (!prev) return null;
      const newImages = [...prev.images];
      if (newImages[index]) {
        newImages[index] = res.url;
      } else {
        newImages.push(res.url);
      }
      return { ...prev, images: newImages };
    });
  };
    /**
     * update old thumbnail
     * @param file
     */
    const onchangeThumbnail = async (file: File) => {
      dispatch(onLoadingAction(true));
      const res = await uploadImageToCloud(file);
      if (res) {
        dispatch(onLoadingAction(false));
        if (res.resultCode == 1)
          setData((prev) => {
            if (!prev) return null;
            return { ...prev, thumbnail: res.url };
          });
        else
          dispatch(
            onErrorModel({ onError: true, mess: "Lỗi upload ảnh lên đám mây!" })
          );
      }
    };
  /**
   * remove image of images list by index
   * @param index
   */
  const removeImageInImageList = (index: number) => {
    setData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        images: prev.images.filter((_, idx) => idx !== index),
      };
    });
  };
  return (
    <section className="bg-white mb-6">
      <h2 className="text-lg font-bold uppercase border-b pb-2 mb-4">
        Hình ảnh sản phẩm
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          <p className="font-semibold mb-2">Ảnh bìa</p>
          <label htmlFor="thumbnail" className="cursor-pointer block">
            <Image
              src={data.thumbnail}
              alt="thumbnail"
              width={200}
              height={180}
              className="d border border-gray-300 object-cover w-[200px] h-[180px]"
            />
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onchangeThumbnail(file);
              }}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex-1">
          <p className="font-semibold mb-2">Ảnh chi tiết</p>
          <div className="flex flex-wrap gap-3">
            {data.images.map((img, i) => (
              <label key={i} htmlFor={`${img}-${i}`} className="w-max">
                <div className="flex justify-end">
                  <button
                    className="text-red-500 h-max"
                    onClick={() => {
                      removeImageInImageList(i);
                    }}
                  >
                    x
                  </button>
                </div>
                <Image
                  key={i}
                  src={img}
                  alt={`detail-${i}`}
                  width={150}
                  height={120}
                  className="d border border-gray-300 w-[150px] h-[120px] object-cover"
                />
                <input
                  id={`${img}-${i}`}
                  type="file"
                  onChange={async (e) => {
                    const { files } = e.target;
                    if (!files) return;
                    const file = files[0];
                    await onChangeImages(i, file);
                  }}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            ))}
            <label
              htmlFor="new-image"
              className="border mt-6 border-dashed border-green-400 text-green-500 w-[150px] h-[120px] flex items-center justify-center cursor-pointer d"
            >
              + Thêm ảnh
              <input
                type="file"
                id="new-image"
                onChange={async (e) => {
                  const { files } = e.target;
                  if (!files) return;
                  const file = files[0];
                  await onChangeImages(data.images.length, file);
                }}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
