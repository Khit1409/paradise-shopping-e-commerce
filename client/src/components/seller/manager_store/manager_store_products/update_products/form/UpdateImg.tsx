import { onErrorModel, onLoadingAction } from "@/api/Redux/Slice/App/app.slice";
import { AppDispatch } from "@/api/Redux/store";
import { uploadImageToCloud } from "@/feature/upload";
import Image from "next/image";
import React, { SetStateAction } from "react";
import { useDispatch } from "react-redux";

type ImageDetailType = {
  _id?: string;
  imgUrl?: string;
};

type ComponentProps = {
  imgUrl?: string;
  setImgDetail: React.Dispatch<SetStateAction<ImageDetailType[]>>;
  setDeleteImg: React.Dispatch<SetStateAction<{ _id: string }[]>>;
  setImg: React.Dispatch<SetStateAction<string | undefined>>;
  imgDetail: ImageDetailType[];
};

export default function ImgInput({
  imgUrl,
  setDeleteImg,
  setImgDetail,
  setImg,
  imgDetail,
}: ComponentProps) {
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Upload ảnh đại diện (avatar)
   */
  async function handleOnchangeImg(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(onLoadingAction(true));
    const { files } = e.target;
    const file = files?.[0];

    if (!file) {
      dispatch(onLoadingAction(false)); // không chọn file thì dừng
      return;
    }

    const url = await uploadImageToCloud(file);

    if (!url) {
      dispatch(onErrorModel({ mess: "Không thể upload ảnh", onError: true }));
      dispatch(onLoadingAction(false));
      return;
    }

    setImg(url);
    dispatch(onLoadingAction(false));

    // reset input để chọn lại cùng 1 file không bị ignore
    e.target.value = "";
  }

  /**
   * Upload / cập nhật ảnh chi tiết
   * - Nếu `id` đã tồn tại thì update imgUrl
   * - Nếu chưa thì thêm mới
   */
  async function onChangeImgDetail(e: React.ChangeEvent<HTMLInputElement>) {
    const { dataset, files } = e.target;
    const file = files?.[0];
    const id = dataset.id ?? "";

    if (!file) return;

    dispatch(onLoadingAction(true));
    const fileUrl = await uploadImageToCloud(file);

    setImgDetail((prev) =>
      prev.some((f) => f._id === id)
        ? prev.map((f) => (f._id === id ? { ...f, imgUrl: fileUrl ?? "" } : f))
        : [...prev, { _id: id, imgUrl: fileUrl ?? "" }]
    );

    dispatch(onLoadingAction(false));
    e.target.value = "";
  }

  //lưu các ảnh user muốn xóa
  function deleteImageDetail(imgId: string) {
    setDeleteImg((prev) => {
      return [...prev, { _id: imgId }];
    });
    setImgDetail((prev) => {
      return prev.filter((ft) => ft._id !== imgId);
    });
  }
  return (
    <>
      <section className="p-5 flex flex-col gap-5 text-gray-700 bg-white rounded-xl shadow-md border border-gray-200">
        {/* Ảnh đại diện */}
        <div className="flex flex-col gap-3">
          <label htmlFor="newImg" className="font-semibold text-gray-800">
            Ảnh đại diện
          </label>
          <div className="relative w-[120px] h-[120px] rounded-xl overflow-hidden border border-gray-300 hover:border-green-400 transition-all cursor-pointer">
            <Image
              src={imgUrl ?? "/imgs/food.jpg"}
              alt="avatar"
              width={120}
              height={120}
              className="object-cover w-full h-full hover:scale-105 transition-transform"
            />
            <input
              type="file"
              id="newImg"
              className="hidden"
              onChange={handleOnchangeImg}
            />
            <label
              htmlFor="newImg"
              className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 flex items-center justify-center text-white font-semibold text-sm transition-opacity"
            >
              Đổi ảnh
            </label>
          </div>
        </div>

        {/* Ảnh chi tiết */}
        <div>
          <p className="font-semibold text-gray-800 mb-2">Ảnh chi tiết</p>
          <div className="flex gap-4 flex-wrap">
            {imgDetail.map((img, idx) => (
              <div
                key={img._id ?? idx}
                className="relative hover:scale-[1.02] w-[100px] h-[100px] rounded-xl overflow-hidden border border-gray-300 hover:border-green-400 transition-all cursor-pointer"
              >
                {/* Nút xoá */}
                <button
                  type="button"
                  role="button"
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-md transition-opacity"
                  onClick={() => deleteImageDetail(img._id ?? "")}
                >
                  ✕
                </button>

                <label
                  htmlFor={`${idx + 1}-${img._id}`}
                  className="block w-full h-full"
                >
                  <input
                    type="file"
                    data-id={img._id ?? ""}
                    id={`${idx + 1}-${img._id}`}
                    onChange={onChangeImgDetail}
                    className="hidden"
                  />
                  <Image
                    src={img.imgUrl ?? "/imgs/food.jpg"}
                    alt={`${idx}-${img._id}`}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                  />
                </label>
              </div>
            ))}

            {/* Nút thêm ảnh */}
            <label
              htmlFor="new"
              className="w-[100px] h-[100px] border-2 border-dashed border-green-400 text-green-500 rounded-xl flex items-center justify-center text-sm cursor-pointer hover:bg-green-50 transition"
            >
              + Ảnh
              <input
                type="file"
                data-id={crypto.randomUUID()}
                id="new"
                onChange={onChangeImgDetail}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </section>
    </>
  );
}
