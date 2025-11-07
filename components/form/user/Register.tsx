import { getIconByName } from "@/utils/getIconByName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faHome,
  faImage,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { RegisterHook, RegisterInputState } from "@/hook/auth/registerHook";
import { REGISTER_LIST } from "../data";
import Link from "next/link";

export default function RegisterForm() {
  const { setRegisterInput, onchangeAvatar, registerInput, handleRegister } =
    RegisterHook();
  const { avatar } = registerInput;
  return (
    <section className="flex border p-5 border-gray-300">
      {/* preview */}
      <div className="flex-1 flex gap-2 justify-center items-center">
        <label htmlFor="avatar" className="w-[200px] h-[200px]">
          {avatar ? (
            <Image src={avatar} alt="" width={200} height={100} />
          ) : (
            <div className="w-[200px] h-[200px] rounded-full border border-gray-300" />
          )}
          <input
            type={"file"}
            id="avatar"
            accept="image/*"
            onChange={async (e) => {
              onchangeAvatar(e);
            }}
            required
            className="hidden"
          />
        </label>
      </div>
      {/* form input */}
      <form
        className="p-5 w-full flex flex-col flex-2"
        onSubmit={handleRegister}
      >
        <div>
          <h2>ĐĂNG KÝ TÀI KHOẢN</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* register form */}
          {REGISTER_LIST.map((item, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={item.name} className="text-gray-700 mb-3">
                {item.title}
              </label>
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
                className="p-2 border border-gray-300 rounded-full outline-0 hover:scale-[1.02] transition text-gray-700"
                placeholder={item.title}
              />
            </div>
          ))}
        </div>
        {/* action button */}
        <div className="flex gap-3 py-2">
          <button
            type="submit"
            className="hover:scale-[1.02] hover:bg-green-400 font-semibold text-gray-700 transition px-2 py-1  border border-gray-300"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            ĐĂNG KÝ
          </button>
          <Link
            href={"/login"}
            className="hover:scale-[1.02] hover:bg-green-400 font-semibold text-gray-700 transition px-2 py-1  border border-gray-300"
          >
            <FontAwesomeIcon icon={faUser} />
            ĐĂNG NHẬP
          </Link>
          <Link
            href={"/"}
            className="hover:scale-[1.02] hover:bg-green-400 font-semibold text-gray-700 transition px-2 py-1  border border-gray-300"
          >
            <FontAwesomeIcon icon={faHome} />
            TRANG CHỦ
          </Link>
        </div>
      </form>
    </section>
  );
}
