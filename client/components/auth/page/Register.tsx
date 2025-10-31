"use client";

import {
  faHome,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import RegisterForm from "../../form/Register";
import { RegisterHook } from "../../../hook/auth/registerHook";

export default function Register() {
  /**
   * hook
   */
  const { handleRegister } = RegisterHook();
  /**
   * return
   */
  return (
    <section>
      <div className="flex flex-col items-center py-2 lg:h-screen lg:max-h-screen overflow-hidden justify-center">
        <form className="border border-gray-300 p-5" onSubmit={handleRegister}>
          <div>
            <h2>ĐĂNG KÝ TÀI KHOẢN</h2>
          </div>
          {/* register form */}
          <RegisterForm />
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
      </div>
    </section>
  );
}
