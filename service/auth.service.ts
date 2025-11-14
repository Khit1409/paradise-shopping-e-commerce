import { apiAction } from "@/config/fetch-api.config";
import {
  AuthenticatedUserResponse,
  RegisterRequestType,
} from "@/type/auth.type";
import { GeneralHandleResponse } from "@/type/general.type";
/**
 * check validate value of request
 * if null => return follow invalid value
 * else => return null (is not wrong)
 * @param email
 * @param password
 * @returns
 */
export const checkValidateLoginRequest = (
  email: string,
  password: string
): string | null => {
  if (email === "") {
    return "Vui lòng nhập email!";
  } else if (email === "") {
    return "Vui lòng nhập mật khẩu!";
  } else if (email === "" && password === "") {
    return "Vui lòng nhập email và mật khẩu!";
  }
  return null;
};
/**
 * check validate value of register request
 * @param req
 * @returns
 */
export const checkValidateRegisterRequest = (req: RegisterRequestType) => {
  const isValid = !Object.entries(req).some(
    ([key, value]) => key !== "avatar" && !value
  );
  return isValid;
};
/**
 * function register new account for user
 * @body RegisterRequestType
 * @returns
 */
export async function clietnRegister({
  ...body
}: RegisterRequestType): Promise<GeneralHandleResponse> {
  const res = await apiAction.post(`auth/register`, {
    ...body,
  });
  //result from api data
  const result: GeneralHandleResponse = res.data;
  // response
  return result;
}
/**
 * type of login request
 */
type LoginRequest = {
  email: string;
  role: "user" | "seller";
  password: string;
};
/**
 * Login from client
 * @param role
 * @param password
 * @param email
 * @returns
 */
export async function signIn({
  role,
  email,
  password,
}: LoginRequest): Promise<GeneralHandleResponse> {
  const res = await apiAction.post(`auth/login`, {
    role,
    email,
    password,
  });
  const payload = res.data;
  return payload;
}
/**
 * authentication user => send cookie and get user data
 * @param role
 * @returns
 */
export async function Authentication(
  role: "seller" | "user"
): Promise<AuthenticatedUserResponse | null> {
  const res = await apiAction.get(`auth/me/${role}`);
  const data: AuthenticatedUserResponse | null = res.data;
  if (!data) {
    return null;
  }
  return data;
}
/**
 * Update account
 */
export type UpdateAccountRequest = {
  phone?: { _id: string; phoneNum: string }[];
  address?: { _id: string; addressName: string }[];
  email?: { _id: string; emailAddress: string }[];
  lastName?: string;
  firtName?: string;
  avatar?: string;
};
/**
 * withCredential: auto true
 * @param params
 * @returns
 */
export async function updateUserAccount({ ...params }: UpdateAccountRequest) {
  try {
    const res = await apiAction.put(`users`, {
      ...params,
    });
    const api: { message: string; resultCode: number } = res.data;
    return { message: api.message, resultCode: api.resultCode };
  } catch (error) {
    return { message: `${error}`, resultCode: 0 };
  }
}
/**
 * logout
 * @param pram0
 */
export async function logout(
  role: "user" | "seller"
): Promise<GeneralHandleResponse> {
  const res = await apiAction.put(`auth/logout/${role}`);
  return res.data;
}
