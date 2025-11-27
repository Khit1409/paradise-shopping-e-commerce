import { RootState } from "@/redux/store";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user!);
  const [onSet, setOnSet] = useState<boolean>(false);
  const [onSubmitButton, setOnSubmitButton] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState<File>();

  const hiddenId = (id: string): string => {
    const hashed = id.split("-");
    if (!hashed) return "";
    return `${hashed[0]}*****${hashed[hashed.length - 1]}`;
  };
  return (
    <div className="bg-white text-gray-700 min-h-screen">
      <div className="p-5">
        <div className="text-center mb-10">
          <h1>Thông tin cá nhân</h1>
        </div>
        <div className="flex gap-3 px-2">
          {/* user informations */}
          <div className="flex flex-col gap-5 items-center">
            <div>
              <label htmlFor="user_avatar">
                <Image
                  className="rounded-full border border-gray-300 w-[200px] h-[200px] object-cover"
                  src={
                    userAvatar
                      ? URL.createObjectURL(userAvatar)
                      : user.avatar
                        ? user.avatar
                        : "/imgs/default-avatar.jpg"
                  }
                  width={200}
                  height={200}
                  alt="user_avatar"
                />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  id="user_avatar"
                  onChange={(e) => {
                    const { files } = e.target;
                    if (!files) return;
                    setUserAvatar(files[0]);
                  }}
                />
              </label>
            </div>
            <div className="p-2 border border-gray-300 rounded-sm">
              <div className="mb-3">
                <strong>Mã người dùng:</strong>
                <span className="ms-2">{hiddenId(user.id)}</span>
              </div>
              <div className="mb-3">
                <strong>Họ và tên :</strong>
                <span className="ms-2">{user?.fullname}</span>
              </div>
              <div className="mb-3">
                <strong>Quyền truy cập:</strong>
                <span className="ms-2">
                  {user.role === "seller" ? "Chủ cửa hàng" : "Người mua hàng"}
                </span>
              </div>
              <div className="mb-3">
                <strong>Chủ sở hữu cửa hàng:</strong>
                <span className="ms-2">
                  {user.store_id ? hiddenId(user.store_id) : "Không có"}
                </span>
              </div>
              {/* address */}
              <div className="mb-3">
                <strong>Danh sách địa chỉ:</strong>
                {user.address.map((address, addressIdx) => (
                  <div key={addressIdx}>
                    <span className="me-2">{addressIdx + 1}. </span>
                    {address}
                  </div>
                ))}
              </div>
              {/* phone*/}
              <div className="mb-3">
                <strong>Danh sách số điện thoại:</strong>
                {user.phone.map((phone, phoneIdx) => (
                  <div key={phoneIdx}>
                    <span className="me-2">{phoneIdx + 1}. </span>
                    {phone}
                  </div>
                ))}
              </div>
              {/* email */}
              <div className="mb-3">
                <strong>Danh sách địa chỉ email:</strong>
                {user.email.map((email, emailIdx) => (
                  <div key={emailIdx}>
                    <span className="me-2">{emailIdx + 1}. </span>
                    {email}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
