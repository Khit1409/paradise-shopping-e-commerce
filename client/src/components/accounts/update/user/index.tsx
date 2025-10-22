"use client";

import { AppDispatch, RootState } from "@/api/redux/store";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import {
  onErrorModel,
  onLoadingAction,
  onSuccessfulModel,
} from "@/api/redux/slice/app_slice/app.slice";
import { updateUserAccount } from "@/api/services/auth.service";
import UserUpdateBasicInput from "../form/UserUpdateBasicInput";
import UserUpdateContact from "../form/UserUpdateContact";
import { authenticationThunk } from "@/api/redux/thunk/auth_thunk/auth.thunk";
import { useRouter } from "next/navigation";

export default function UserUpdateAccountPage() {
  const router = useRouter();
  /**
   * Props state
   */
  const [newAvatar, setNewAvatar] = useState<string>("");
  const [newFirtName, setNewFirtName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
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
      dispatch(onLoadingAction(true));
      const result = await updateUserAccount({
        address: newAddress,
        phone: newPhone,
        email: newEmail,
        newFirtName,
        newLastName,
        newAvatar,
      });
      if (result.resultCode == 1) {
        dispatch(onLoadingAction(false));
        dispatch(onSuccessfulModel(true));
      } else {
        dispatch(onLoadingAction(false));
        dispatch(
          onErrorModel({
            onError: true,
            mess: "Error ,cập nhật thông tin tài khoản thất bại",
          })
        );
      } 
    } catch (error) {
      dispatch(onLoadingAction(false));
      dispatch(onErrorModel({ onError: true, mess: `${error}` }));
    }
  }
  return (
    user && (
      <div className="flex flex-col gap-3 p-2 text-gray-700">
        <UserUpdateBasicInput
          newAvatarValue={newAvatar}
          user={user}
          dispatch={dispatch}
          getNewAvatar={setNewAvatar}
          getNewFirtName={setNewFirtName}
          getNewLastName={setNewLastName}
        />
        <UserUpdateContact
          submitChange={setIsSubmit}
          isSubmit={isSubmit}
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
