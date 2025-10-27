import { getIconByName } from "@/ultis/ultis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { registerList } from "./form_list";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/api/redux/store";
import { uploadImageToCloud } from "@/feature/upload";
import { onLoadingAction } from "@/api/redux/slice/app_slice/app.slice";
/**
 *
 */
type PostType = {
  firtname: string;
  email: string;
  phone: string;
  lastname: string;
  password: string;
  repassword: string;
};
/**
 *
 */
type ComponentProps = {
  setAvt: React.Dispatch<React.SetStateAction<string>>;
  setRegisterInput: React.Dispatch<React.SetStateAction<PostType>>;
};

export default function RegisterAccountForm({ ...props }: ComponentProps) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
      {registerList.map((item, index) => (
        <div key={index} className="flex flex-col">
          <label htmlFor={item.name} className="text-xl text-gray-700">
            {item.title}
          </label>
          <div>
            <FontAwesomeIcon icon={getIconByName(item.icon)} className="me-2" />
            <input
              type={item.type}
              onChange={(e) =>
                props.setRegisterInput((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              name={item.name}
              id={item.name}
              required
              className="p-2 rounded-sm outline-0 hover:scale-[1.02] transition text-gray-700 w-full"
              placeholder={item.title}
            />
          </div>
        </div>
      ))}
      {/* avatar */}
      <div className="flex flex-col">
        <label className="text-xl text-gray-700" htmlFor="avatar">
          Chọn ảnh đại diện
        </label>
        <div>
          <FontAwesomeIcon icon={faImage} className="me-2" />
          <input
            type={"file"}
            id="avatar"
            accept="image/*"
            onChange={async (e) => {
              dispatch(onLoadingAction(true));
              const file = e.target.files?.[0];
              const url = await uploadImageToCloud(file);
              if (url) {
                dispatch(onLoadingAction(false));
              }
              props.setAvt(url ?? "");
            }}
            required
            className="p-2 rounded-sm outline-0 hover:scale-[1.02] transition text-gray-700 w-full"
          />
        </div>
      </div>
    </div>
  );
}
