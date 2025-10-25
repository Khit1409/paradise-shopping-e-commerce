import axios from "axios";
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
}: {
  role: "user" | "seller";
  email: string;
  password: string;
}) {
  try {
    const res: {
      data: {
        message: string;
        resultCode: number;
      };
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        role,
        email,
        password,
      },
      { withCredentials: true }
    );
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
  userAddress: { _id: string; addressName: string }[] | null;
  userOtherPhone: { _id: string; phoneNum: string }[] | null;
  userOtherEmail: { _id: string; emailAddress: string }[] | null;
};
/**
 * authentication user => send cookie and get user data
 * @param role
 * @returns
 */
export async function Authentication(
  role: "seller" | "user"
): Promise<UserResponse | null> {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    {
      withCredentials: true,
    }
  );
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
  newLastName?: string;
  newFirtName?: string;
  newAvatar?: string;
};
/**
 * withCredential: auto true
 * @param params
 * @returns
 */
export async function updateUserAccount({ ...params }: UpdateAccountRequest) {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/users/update_user_account`,
      {
        ...params,
      },
      {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        withCredentials: true,
      }
    );
    const api: { message: string; resultCode: number } = res.data;
    return { message: api.message, resultCode: api.resultCode };
  } catch (error) {
    return { message: `${error}`, resultCode: 0 };
  }
}
