import axios from "axios";

export interface RegisterType {
  user_firtname: string;
  user_avatar?: string;
  user_email: string;
  user_phone: string;
  user_lastname: string;
  user_password: string;
  user_address?: string;
}

/**
 *
 * @param param0
 * @returns
 */
export async function clietnRegisterService({
  user_firtname,
  user_avatar,
  user_email,
  user_phone,
  user_lastname,
  user_address,
  user_password,
}: RegisterType) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
    {
      user_avatar,
      user_email,
      user_firtname,
      user_lastname,
      user_password,
      user_phone,
      user_address,
    }
  );
  const result: {
    resultCode: number;
    message: string;
  } = res.data.resultCode;

  return result;
}
