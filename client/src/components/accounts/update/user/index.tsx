"use client";

import { AppDispatch, RootState } from "@/api/Redux/store";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/api/Redux/Slice/App/app.slice";
import { updateUserAccount } from "@/api/services/auth.service";
import UserUpdateBasicInput from "../form/UserUpdateBasicInput";
import UserUpdateContact from "../form/UserUpdateContact";

export default function UserUpdateAccountPage() {
  /**
   * Props state
   */
  const [newAvatar, setNewAvatar] = useState<string>("");
  const [newAddress, setNewAddress] = useState<
    { _id: string; addressName: string }[]
  >([]);
  const [newPhone, setNewPhone] = useState<{ _id: string; phoneNum: string }[]>(
    []
  );
  const [newEmail, setNewEmail] = useState<
    { _id: string; emailAddress: string }[]
  >([]);

  /**
   * Redux
   */
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  /**
   * Function submit
   */
  async function updateAccount(): Promise<void> {
    try {
      const result = await updateUserAccount({
        address: newAddress,
        phone: newPhone,
        email: newEmail,
      });
      if (result.resultCode == 1) {
        dispatch(onLoadingAction(false));
        dispatch(onSuccessfulModel(true));
        return;
      } else if (result.resultCode !== 1) {
        dispatch(onLoadingAction(false));
        dispatch(
          onErrorModel({
            onError: true,
            mess: "Error ,cập nhật thông tin tài khoản thất bại",
          })
        );
        return;
      }
    } catch (error) {
      dispatch(onLoadingAction(false));
      dispatch(onErrorModel({ onError: true, mess: `${error}` }));
      return;
    }
  }
  return (
    user && (
      <div className="flex flex-col gap-3 p-2 text-gray-700">
        <UserUpdateBasicInput user={user} />
        <UserUpdateContact
          user={user}
          getAddressValue={setNewAddress}
          getEmailValue={setNewEmail}
          getPhoneValue={setNewPhone}
        />
        <section
          id="action-button"
          className="bg-white p-2 rounded shadow-md flex gap-4"
        >
          <button
            onClick={() => updateAccount()}
            className="bg-green-500 px-2 py-1 rounded text-white hover:bg-green-600"
          >
            Xác nhận thay đổi
            <FontAwesomeIcon icon={faSave} className="ms-2" />
          </button>
          <button className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600">
            Xóa tài khoản
          </button>
        </section>
      </div>
    )
  );
}
