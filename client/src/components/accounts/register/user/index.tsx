"use client";

import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/api/redux/slice/app_slice/app.slice";
import { AppDispatch } from "@/api/redux/store";
import {
  faHome,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import RegisterAccountForm from "../form_input/RegisterAccountForm";
import { clietnRegisterService } from "@/api/services/auth.service";

type PostType = {
  firtname: string;
  email: string;
  phone: string;
  lastname: string;
  password: string;
  repassword: string;
};

export default function UserRegisterAccountPage() {
  /**
   * redux
   */
  const dispatch = useDispatch<AppDispatch>();
  /**
   * component state
   */
  const [avt, setAvt] = useState<string>("");
  const [registerInput, setRegisterInput] = useState<PostType>({
    firtname: "",
    email: "",
    phone: "",
    lastname: "",
    password: "",
    repassword: "",
  });
  /**
   * Register onchange
   * @param e
   */
  const handleRegister = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (registerInput.password !== registerInput.repassword) {
        dispatch(
          onErrorModel({
            mess: "Hai mật khẩu bạn nhập không trùng khớp",
            onError: true,
          })
        );
        return;
      }

      dispatch(onLoadingAction(true));

      const result = await clietnRegisterService({
        email: registerInput.email,
        firtname: registerInput.firtname,
        lastname: registerInput.lastname,
        password: registerInput.password,
        phone: registerInput.phone,
        avatar: avt ?? "",
      });
      if (result.resultCode == 1) {
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

  return (
    <section>
      <div className="flex flex-col items-center py-2 lg:h-screen lg:max-h-screen overflow-hidden justify-center">
        <form className="border border-gray-300 p-5" onSubmit={handleRegister}>
          <div>
            <h2>ĐĂNG KÝ TÀI KHOẢN</h2>
          </div>
          <RegisterAccountForm
            setAvt={setAvt}
            setRegisterInput={setRegisterInput}
          />
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
      </div>
    </section>
  );
}
