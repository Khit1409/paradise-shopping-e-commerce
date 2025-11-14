import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  faHome,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { REGISTER_LIST } from "../data";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import { clietnRegister } from "@/service/auth.service";
import { OnchangeImage } from "@/utils/onchangeImage";

interface RegisterInputState {
  firtname: string;
  email: string;
  phone: string;
  lastname: string;
  password: string;
  repassword: string;
  avatar: string;
}

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  /**
   * component state
   */
  const [registerInput, setRegisterInput] = useState<RegisterInputState>({
    firtname: "",
    email: "",
    phone: "",
    lastname: "",
    password: "",
    repassword: "",
    avatar: "",
  });
  /**
   * Register onchange
   * @param e
   */
  const handleRegister = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { email, firtname, lastname, password, phone, repassword, avatar } =
        registerInput;
      const isValid = !Object.entries(registerInput).some(
        ([key, value]) => key !== "avatar" && !value
      );
      if (!isValid) {
        dispatch(
          onErrorModel({
            mess: "Vui lòng nhập đầy đủ thông tin đăng ký!",
            onError: true,
          })
        );
        return;
      }
      if (password !== repassword) {
        dispatch(
          onErrorModel({
            mess: "Hai mật khẩu bạn nhập không trùng khớp",
            onError: true,
          })
        );
        return;
      }

      dispatch(onLoadingAction(true));

      const result = await clietnRegister({
        email,
        firtname,
        lastname,
        password,
        phone,
        avatar,
      });
      if (result.success) {
        dispatch(onLoadingAction(false));
        dispatch(onSuccessfulModel(true));
      } else {
        const error = new Error();
        dispatch(onLoadingAction(false));
        dispatch(
          onErrorModel({
            mess: `${error}`,
            onError: true,
          })
        );
      }
    } catch (error) {
      dispatch(onLoadingAction(false));
      dispatch(
        onErrorModel({
          mess: `${error}`,
          onError: true,
        })
      );
    }
  };

  const onchangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(onLoadingAction(true));
    const url: string | null = await OnchangeImage(e);
    if (url) {
      dispatch(onLoadingAction(false));
      setRegisterInput((prev) => ({ ...prev, avatar: url }));
    } else {
      dispatch(onLoadingAction(false));
      dispatch(
        onErrorModel({
          onError: true,
          mess: "Error up load pricture to cloud",
        })
      );
    }
  };
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
