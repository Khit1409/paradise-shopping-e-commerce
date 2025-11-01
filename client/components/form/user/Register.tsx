import { getIconByName } from "@/utils/getIconByName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {
  RegisterHook,
  RegisterInputState,
} from "@/hook/auth/registerHook";
import { REGISTER_LIST } from "../data";

export default function RegisterForm() {
  const { setRegisterInput, onchangeAvatar, registerInput } = RegisterHook();
  const { avatar } = registerInput;
  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
        {REGISTER_LIST.map((item, index) => (
          <div key={index} className="flex flex-col">
            <label htmlFor={item.name} className="text-xl text-gray-700">
              {item.title}
            </label>
            <div>
              <FontAwesomeIcon
                icon={getIconByName(item.icon)}
                className="me-2"
              />
              <input
                type={item.type}
                value={
                  registerInput[`${item.name as keyof RegisterInputState}`]
                }
                onChange={(e) =>
                  setRegisterInput((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name={item.name}
                id={item.name}
                required
                className="p-2 rounded-sm outline-0 hover:scale-[1.02] transition text-gray-700 w-full"
                placeholder={item.title}
              />
            </div>
          </div>
        ))}
        {/* avatar */}
        <div className="flex flex-col">
          <label className="text-xl text-gray-700" htmlFor="avatar">
            Chọn ảnh đại diện
          </label>
          <div>
            {avatar && <Image src={avatar} alt="" width={100} height={100} />}
            <FontAwesomeIcon icon={faImage} className="me-2" />
            <input
              type={"file"}
              id="avatar"
              accept="image/*"
              onChange={async (e) => {
                onchangeAvatar(e);
              }}
              required
              className="p-2 rounded-sm outline-0 hover:scale-[1.02] transition text-gray-700 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
