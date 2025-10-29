import { apiAction } from "@/config/axios";
import {
  RegisterType,
  UserServiceGeneralErrorType,
} from "../interfaces/user.interface";
import axios from "axios";

/**
 * Helper: Standardized error response
 */
const handleApiError = (
  error: unknown
): { message: string; resultCode: number } => {
  const msg =
    axios.isAxiosError(error) && error.response?.data?.message
      ? error.response.data.message
      : String(error);
  return { message: msg, resultCode: 0 };
};
/**
 * function register new account for user
 * @body REGISTERTYPE
 * @returns
 */
export async function clietnRegisterService({
  ...body
}: RegisterType): Promise<UserServiceGeneralErrorType> {
  try {
    const res = await apiAction.post(`auth/register`, {
      ...body,
    });
    //result from api data
    const result: UserServiceGeneralErrorType = res.data;
    // response
    return result;
  } catch (error) {
    return handleApiError(error);
  }
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
export async function signIn({ role, email, password }: LoginRequest) {
  try {
    const res: {
      data: {
        message: string;
        resultCode: number;
      };
    } = await apiAction.post(`auth/login`, {
      role,
      email,
      password,
    });
    const payload = res.data;
    return payload;
  } catch (error) {
    return { message: `${error}`, resultCode: 0 };
  }
}
/**
 * Authentication
 * @param param0
 * @returns
 */
export type UserResponse = {
  userId: string;
  userFirtName: string;
  userLastName: string;
  userEmail: string;
  userPhone: string;
  userStore: number | null;
  userRole: "user";
  userAvatar: string | null;
  userAddress: { _id: string; addressName: string }[];
  userOtherPhone: { _id: string; phoneNum: string }[];
  userOtherEmail: { _id: string; emailAddress: string }[];
};
/**
 * authentication user => send cookie and get user data
 * @param role
 * @returns
 */
export async function Authentication(): Promise<UserResponse | null> {
  const res = await apiAction.get(`auth/me`);
  const data: UserResponse | null = res.data.api;
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
export async function logout(): Promise<{
  resultCode: number;
  message: string;
}> {
  try {
    const res = await apiAction.post(`auth/logout`);
    return res.data;
  } catch (error) {
    return { resultCode: 0, message: `${error}` };
  }
}
