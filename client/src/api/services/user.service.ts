import axios from "axios";
import {
  RegisterType,
  UserServiceGeneralErrorType,
} from "../interfaces/user.interface";
/**
 * =================
 * API CONFIGURATION
 * =================
 */
const USER_API_URL = process.env.NEXT_PUBLIC_USER_API_URL;
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
 * ======================
 * SERVICE FOR HANDLE USER API
 * ======================
 */
/**
 * function register new account for user
 * @body REGISTERTYPE
 * @returns
 */
export async function clietnRegisterService({
  ...body
}: RegisterType): Promise<UserServiceGeneralErrorType> {
  try {
    const res = await axios.post(`${USER_API_URL}/register`, {
      ...body,
    });
    //result from api data
    const result: UserServiceGeneralErrorType = res.data;

    return result;
  } catch (error) {
    return handleApiError(error);
  }
}
