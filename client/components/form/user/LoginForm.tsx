"use client";
import {
  faEye,
  faEyeSlash,
  faPaperPlane,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import { USER_LOGIN } from "../data";
/**
 * Type Props
 */
type ComponentProps = {
  handle: (e: React.FormEvent<Element>) => Promise<void>;
  getRequestData: React.Dispatch<
    SetStateAction<{
      email: string;
      password: string;
    }>
  >;
  acceptLogin: React.Dispatch<SetStateAction<boolean>>;
  acceptLoginState: boolean;
};
/**
 * function components
 * @returns
 */
export default function LoginForm(props: ComponentProps) {
  const { acceptLogin, acceptLoginState, getRequestData, handle } = props;
  /**
   * component state
   */
  const [showPassword, setShowPassword] = useState<boolean>(false);
  /**
   * render
   */
  return (
    <section id="login" className="">
      <div className="flex flex-col items-center h-screen max-h-screen overflow-hidden justify-center">
        {/* form */}
        <form
          onSubmit={handle}
          className="flex flex-col gap-4 border border-gray-300 p-5 lg:w-[600px] md:w-[400px] w-[350px] bg-white"
        >
          <div className="text-center">
            <h2>Join To Our Website</h2>
          </div>
          {/* input elm */}
          {USER_LOGIN.map((item, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={item.name} className="text-xl text-gray-700">
                {item.title}
              </label>
              <div className="relative">
                <FontAwesomeIcon icon={faUserPen} className="me-2" />
                <input
                  type={`${
                    item.type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : item.type
                  }`}
                  name={item.name}
                  onChange={(e) =>
                    getRequestData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  id={item.name}
                  className="p-2 rounded-full border border-gray-300 outline-0 hover:scale-[1.02] transition text-gray-700 w-full"
                  placeholder={item.mess}
                />
                {item.type === "password" ? (
                  <button
                    type="button"
                    role="button"
                    className="absolute right-2 top-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
          {/* accept login */}
          <div>
            <label htmlFor="check">
              Bạn có đồng ý với
              <a href="" className="text-blue-500 mx-1 hover:underline">
                điều khoản và dịch vụ của chúng tôi?
              </a>
            </label>
            <input
              type="checkbox"
              name="check"
              id="check"
              checked={acceptLoginState}
              onChange={() => acceptLogin(!acceptLoginState)}
            />
          </div>
          {/* navigation button */}
          <div className="flex justify-around">
            <Link href={"/"} className="text-gray-500">
              Quay lại trang chủ
            </Link>
            <Link href={"/register"} className="text-gray-500">
              Tạo tài khoản
            </Link>
          </div>
          {/* submit button */}
          <div className="flex items-center justify-center">
            <button
              disabled={!acceptLoginState}
              className={`text-xl
            ${acceptLoginState && `hover:scale-[1.02] transition`}
            text-gray-50 bg-gray-700 px-2 py-1`}
            >
              <FontAwesomeIcon icon={faPaperPlane} /> Sign In Webiste
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
