import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function Avatar() {
  const { user } = useSelector((sate: RootState) => sate.auth);

  return user && user.userAvatar ? (
    <Image
      src={user.userAvatar}
      alt=""
      width={100}
      height={50}
      className="w-[45px] h-[45px] rounded-full object-cover"
    />
  ) : (
    <></>
  );
}
