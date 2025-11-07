"use client";

import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ProfileSettingHook } from "../../hook/user/ProfileSettingHook";

export default function ProfileSetting() {
  /**
   * props
   */
  const {
    user,
    onchangeAddress,
    onchangeAvatar,
    onchangeEmail,
    submitChange,
    onchangePhone,
    setNewFirtName,
    setNewLastName,
  } = ProfileSettingHook();

  const addressIds = useMemo(
    () => Array.from({ length: 3 }, () => uuidv4()),
    []
  );
  /**
   * memo uuid => dont rerender
   */
  const phoneIds = useMemo(() => Array.from({ length: 3 }, () => uuidv4()), []);
  const emailIds = useMemo(() => Array.from({ length: 3 }, () => uuidv4()), []);

  if (!user) return null;

  return (
    <section className="p-6 bg-gray-50 text-gray-800 border border-gray-200">
      <div className="flex flex-col gap-8 max-w-3xl mx-auto border border-gray-300 p-5">
        {/* Avatar + Name Section */}
        <div className="flex gap-8 items-center">
          <label htmlFor="avatar" className="cursor-pointer shrink-0">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt="avatar"
                width={180}
                height={180}
                className="h-[180px] rounded-full w-[180px] object-cover border border-gray-300"
              />
            ) : (
              <div className="h-[180px] w-[180px] bg-gray-200 border border-gray-300 flex items-center justify-center text-sm text-gray-600">
                Chưa có ảnh
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onchangeAvatar(file);
              }}
            />
          </label>

          <div className="flex flex-col gap-4 flex-1">
            <div>
              <label className="block text-sm font-semibold" htmlFor="firtname">
                Họ
              </label>
              <input
                className="border border-gray-300 p-2 w-full outline-none text-sm"
                type="text"
                name="firtname"
                id="firtname"
                onChange={(e) => setNewFirtName(e.target.value)}
                defaultValue={user.firtname}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold" htmlFor="lastname">
                Tên
              </label>
              <input
                className="border border-gray-300 p-2 w-full outline-none text-sm"
                type="text"
                name="lastname"
                id="lastname"
                onChange={(e) => setNewLastName(e.target.value)}
                defaultValue={user.lastname}
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg border-b border-gray-300 pb-1">
            Địa chỉ
          </h2>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label
                htmlFor={`address-${index}`}
                className="text-sm font-medium"
              >
                Địa chỉ {index + 1}
              </label>
              <input
                type="text"
                id={`address-${index}`}
                className="border border-gray-300 p-2 outline-none text-sm"
                defaultValue={user.userAddress?.[index]?.addressName ?? ""}
                onChange={(e) => {
                  const id =
                    user.userAddress?.[index]?._id ?? addressIds[index];
                  onchangeAddress(id, e.target.value);
                }}
              />
            </div>
          ))}
        </div>

        {/* Phone Section */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg border-b border-gray-300 pb-1">
            Số điện thoại
          </h2>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label htmlFor={`phone-${index}`} className="text-sm font-medium">
                Số {index + 1}
              </label>
              <input
                type="tel"
                id={`phone-${index}`}
                className="border border-gray-300 p-2 outline-none text-sm"
                defaultValue={user.userOtherPhone?.[index]?.phoneNum ?? ""}
                onChange={(e) => {
                  const id =
                    user.userOtherPhone?.[index]?._id ?? phoneIds[index];
                  onchangePhone(id, e.target.value);
                }}
              />
            </div>
          ))}
        </div>

        {/* Email Section */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg border-b border-gray-300 pb-1">
            Email
          </h2>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label htmlFor={`email-${index}`} className="text-sm font-medium">
                Email {index + 1}
              </label>
              <input
                type="email"
                id={`email-${index}`}
                className="border border-gray-300 p-2 outline-none text-sm"
                defaultValue={user.userOtherEmail?.[index]?.emailAddress ?? ""}
                onChange={(e) => {
                  const id =
                    user.userOtherEmail?.[index]?._id ?? emailIds[index];
                  onchangeEmail(id, e.target.value);
                }}
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            className="bg-gray-800 text-white px-4 py-2 text-sm tracking-wide hover:bg-gray-700 transition"
            onClick={() => submitChange()}
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Lưu thay đổi
          </button>
        </div>
      </div>
    </section>
  );
}
