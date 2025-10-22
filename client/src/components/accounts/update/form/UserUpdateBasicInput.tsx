import { onLoadingAction } from "@/api/redux/slice/app_slice/app.slice";
import { AppDispatch } from "@/api/redux/store";
import { UserResponse } from "@/api/services/auth.service";
import { uploadImageToCloud } from "@/feature/upload";
import Image from "next/image";
import { SetStateAction } from "react";

type ComponentProps = {
  user: UserResponse;
  getNewFirtName: React.Dispatch<SetStateAction<string>>;
  getNewLastName: React.Dispatch<SetStateAction<string>>;
  getNewAvatar: React.Dispatch<SetStateAction<string>>;
  dispatch: AppDispatch;
  newAvatarValue: string;
};

export default function UserUpdateBasicInput({ ...props }: ComponentProps) {
  /**
   * rewrite user object
   */
  const reWriteUser = {
    firtName: props.user.userFirtName,
    lastName: props.user.userLastName,
    avatar: props.user.userAvatar,
  };

  //onchange avatar
  const onchangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = e.target;
      const file = files?.[0];
      props.dispatch(onLoadingAction(true));
      if (!file) {
        props.getNewAvatar(reWriteUser.avatar ?? "");
        props.dispatch(onLoadingAction(false));
        return;
      } else {
        const fileUrl = await uploadImageToCloud(file);
        props.getNewAvatar(fileUrl ?? "");
        props.dispatch(onLoadingAction(false));
        return;
      }
    } catch (error) {
      props.dispatch(onLoadingAction(false));
      console.log(error);
      return;
    }
  };
  //render
  return (
    <section className="text-gray-700 p-4 rounded bg-white shadow-md">
      <h3 className="uppercase border-b">Thông tin cơ bản</h3>
      <div className="flex p-2 gap-4 mt-4">
        {/* form */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor={"avatar"}
            className="font-semibold w-[210px] flex justify-center flex-col gap-2"
          >
            {reWriteUser.avatar ? (
              <Image
                src={
                  props.newAvatarValue !== ""
                    ? props.newAvatarValue
                    : reWriteUser.avatar
                }
                alt=""
                width={200}
                height={100}
                className="rounded-full border border-gray-300"
              />
            ) : (
              <div className="w-[100px] h-[100px] border border-green-500 rounded-full" />
            )}
            <input
              type={"file"}
              id={"avatar"}
              onChange={(e) => {
                onchangeAvatar(e);
              }}
              name={"avatar"}
              className="hidden"
            />
          </label>
        </div>
        <div className="w-full p-2">
          <div className="flex flex-col gap-2">
            <label htmlFor={"firtname"} className="font-semibold">
              Họ của bạn
            </label>
            <input
              type={"text"}
              id={"firtname"}
              defaultValue={reWriteUser.firtName}
              name={"firtname"}
              onChange={(e) => props.getNewFirtName(e.target.value)}
              placeholder={"Nhập họ của bạn....."}
              className="outline-hidden border border-gray-300 p-1"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={"lastname"} className="font-semibold">
              Tên của bạn
            </label>
            <input
              type={"text"}
              id={"lastname"}
              defaultValue={reWriteUser.lastName}
              onChange={(e) => props.getNewLastName(e.target.value)}
              name={"lastname"}
              placeholder={"Nhập tên mới của bạn...."}
              className="outline-hidden border border-gray-300 p-1"
            />
          </div>
        </div>
      </div>
      <span className="text-yellow-500">
        *Lưu ý khi bạn thay đổi thông tin cá nhân vui lòng đăng nhập lại ( Không áp dụng cho thay đổi khác ) !
      </span>
    </section>
  );
}
