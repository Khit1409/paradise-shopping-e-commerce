"use client";
import { userLoginForm } from "@/api/form/userlogin.form";
import { faPaperPlane, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SetStateAction } from "react";
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
export default function UserLoginForm({ ...props }: ComponentProps) {
  return (
    <section id="login" className="">
      <div className="flex flex-col items-center h-screen max-h-screen overflow-hidden justify-center">
        {/* form */}
        <form
          onSubmit={props.handle}
          className="flex flex-col gap-4 border border-gray-300 p-5 lg:w-[600px] md:w-[400px] w-[350px]"
        >
          <div className="text-center">
            <h2>Join To Our Website</h2>
          </div>
          {/* input elm */}
          {userLoginForm.map((item, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={item.name} className="text-xl text-gray-700">
                {item.title}
              </label>
              <div>
                <FontAwesomeIcon icon={faUserPen} className="me-2" />
                <input
                  type={item.type}
                  name={item.name}
                  onChange={(e) =>
                    props.getRequestData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  id={item.name}
                  className="p-2 rounded-sm outline-0 hover:scale-[1.02] transition text-gray-700 w-full"
                  placeholder={item.mess}
                />
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
              checked={props.acceptLoginState}
              onChange={() => props.acceptLogin(!props.acceptLoginState)}
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
          <div>
            <button
              disabled={!props.acceptLoginState}
              className={`text-xl
            ${props.acceptLoginState && `hover:scale-[1.02] transition`}
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
