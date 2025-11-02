"use client";

import React from "react";
import RegisterForm from "@/components/form/user/Register";


export default function Register() {
  /**
   * return
   */
  return (
    <section>
      <div className="flex flex-col lg:h-screen w-screen justify-center">
        <RegisterForm />
      </div>
    </section>
  );
}
