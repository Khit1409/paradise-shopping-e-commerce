import { UserResponse } from "@/api/services/auth.service";
import { update_basicInput_list } from "./update_user_account_from_list";

type ComponentProps = {
  user: UserResponse;
};

export default function UserUpdateBasicInput({ ...props }: ComponentProps) {
  /**
   * rewrite user object
   */
  const reWriteUser = {
    firtName: props.user.userFirtName,
    lastName: props.user.userLastName,
    userPhone: props.user.userPhone ?? "",
    userEmail: props.user.userEmail,
  };

  return (
    <section className="text-gray-700 p-4 rounded bg-white shadow-md">
      <h3 className="uppercase border-b">Thông tin cơ bản</h3>
      <div className="flex flex-col p-2 gap-4 mt-4">
        {update_basicInput_list.map((elm, index) => (
          <div key={index} className="flex flex-col gap-2">
            <label htmlFor={elm.id} className="font-semibold">
              {elm.lable}
            </label>
            <input
              type={elm.type}
              id={elm.id}
              defaultValue={reWriteUser[elm.name as keyof typeof reWriteUser]}
              name={elm.name}
              placeholder={elm.title}
              className="outline-hidden border border-gray-300 p-1"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
