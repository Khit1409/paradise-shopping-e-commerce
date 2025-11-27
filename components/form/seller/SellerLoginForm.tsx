"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faHome } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { SellerLoginRequest } from "@/type/auth.type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { checkValidateLoginRequest, signIn } from "@/service/auth.service";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/redux/app/slice";
import { authenticationThunk } from "@/redux/auth/thunk";

export default function SellerLoginForm() {
  /**
   * react state
   */
  const [requestData, setRequestData] = useState<SellerLoginRequest>({
    email: "",
    password: "",
    role: "seller",
  });
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function submitLogin(e: React.FormEvent) {
    e.preventDefault();
    /**
     * check validate request
     */
    const { email, password, role } = requestData;
    const checkError = checkValidateLoginRequest(email, password);
    if (checkError !== null) {
      dispatch(onErrorModel({ onError: true, mess: checkError }));
      return;
    }
    dispatch(onLoadingAction(true));
    try {
      const res = await signIn({ role, password, email });
      if (res) {
        dispatch(onLoadingAction(false));
        if (res.success) {
          await dispatch(authenticationThunk("seller"));
          dispatch(onSuccessfulModel(true));
          return router.replace(`/seller`);
        } else {
          return dispatch(
            onErrorModel({
              onError: true,
              mess: res.message ?? "Server Error: Error login status:500",
            })
          );
        }
      }
    } catch (error) {
      return dispatch(
        onErrorModel({
          onError: true,
          mess: `${error ?? "Server Error: Error login status:500"}`,
        })
      );
    }
  }

  /**
   * component state
   */
  const [showPass, setShowPass] = useState<boolean>(false);
  /**
   * render
   */
  return (
    <form
      onSubmit={submitLogin}
      className="flex items-center h-screen w-screen justify-center"
    >
      <div className="min-w-[500px] flex flex-col justify-around gap-3 border border-gray-300 bg-white text-gray-700 p-5 rounded-sm shadow-md">
        <div>
          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="email" className="font-semibold mb-2">
              Email của bạn
            </label>
            <input
              type="emal"
              value={requestData.email}
              className="border rounded-2xl border-gray-300 outline-0 p-2 bg-white focus:border-green-300 "
              name={"email"}
              onChange={(e) => onchange(e)}
              autoComplete={"off"}
              id={"id"}
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password">Mật khẩu của bạn</label>
            <input
              type={showPass ? "text" : "password"}
              value={requestData.password}
              className="border rounded-2xl border-gray-300 outline-0 p-2 bg-white focus:border-green-300 "
              name={"password"}
              onChange={(e) => onchange(e)}
              autoComplete={"off"}
              id={"password"}
            />
            <button
              className="absolute right-2 top-[55%]"
              type="button"
              onClick={() => {
                setShowPass(!showPass);
              }}
              role="button"
            >
              {showPass ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
        </div>
        {/* action */}
        <div className="flex items-center justify-center">
          <button
            className="border border-gray-300 hover:border-green-500 hover:bg-green-500 px-2 py-1 hover:text-white"
            type="submit"
            role="form"
          >
            ĐĂNG NHẬP
          </button>
        </div>
        {/* navigation */}
        <div className="flex items-center justify-center">
          <Link href={"/"} className="hover:underline hover:text-blue-500">
            Quay lại trang chủ <FontAwesomeIcon icon={faHome} />
          </Link>
        </div>
        {/* message */}
        <p className="mb-3 text-yellow-500 text-center">
          {"Lưu ý chỉ khi tài khoản là người bán mới có thể đăng nhập!"}
        </p>
      </div>
    </form>
  );
}
